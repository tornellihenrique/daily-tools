import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ItemService } from '../../services/item.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Item } from '../../models/item.model';
import { AddComponent } from './add/add.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnDestroy {
  isLoadingCategoryInfo: boolean;
  isLoadingItems: boolean;

  categoryName: string;
  categoryId: number;

  items: Item[] = [];

  realoadSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private itemService: ItemService,
    private toastController: ToastController,
    private modalController: ModalController,
  ) {
    this.isLoadingCategoryInfo = true;
    this.isLoadingItems = true;
  }

  ngOnDestroy() {
    this.realoadSubscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.categoryId = Number(this.route.snapshot.params.id);

    this.loadCategoryInfo();
    this.loadItems();

    this.realoadSubscription = this.itemService.getReloadObservable().subscribe(() => {
      this.loadItems();
    });
  }

  onChangeItem(i: number) {
    this.itemService.update(this.items[i]);
  }

  async onRemoveItem(i: number) {
    try {
      await this.itemService.remove(this.items[i].id);
      this.itemService.reload();
    } catch (e) {
      console.error(e);

      this.presentRemoveErrorToast();
    }
  }

  async add() {
    const modal = await this.modalController.create({
      component: AddComponent,
      componentProps: {
        categoryId: this.categoryId,
      },
    });
    return await modal.present();
  }

  async loadItems(search: string = null) {
    this.isLoadingItems = true;

    try {
      this.items = await this.itemService.getItems(this.categoryId);

      this.isLoadingItems = false;
    } catch (e) {
      console.error(e);
      this.presentLoadErrorToast();

      this.isLoadingItems = false;
    }
  }

  async loadCategoryInfo() {
    this.isLoadingCategoryInfo = true;

    try {
      const category = await this.categoryService.getCategoryById(this.categoryId);

      this.categoryName = category.name;

      this.isLoadingCategoryInfo = false;
    } catch (e) {
      console.error(e);
      this.presentLoadErrorToast();

      this.isLoadingCategoryInfo = false;
    }
  }

  private async presentRemoveErrorToast() {
    const toast = await this.toastController.create({
      message: 'Erro ao remover item.',
      duration: 2000,
    });
    toast.present();
  }

  private async presentLoadErrorToast() {
    const toast = await this.toastController.create({
      message: 'Erro ao carregar item.',
      duration: 2000,
    });
    toast.present();
  }

  reorderItems(event: any) {
    event.detail.complete();
  }
}
