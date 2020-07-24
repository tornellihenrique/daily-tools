import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ToastController, NavController, ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToolsComponent } from './tools/tools.component';
import { AddComponent } from './add/add.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnDestroy {
  realoadSubscription: Subscription;

  categories: Category[] = [];
  isLoading: boolean;

  popover: HTMLIonPopoverElement;

  constructor(
    private categoryService: CategoryService,
    private toastController: ToastController,
    private navController: NavController,
    private popoverController: PopoverController,
    private modalController: ModalController,
  ) {}

  ngOnDestroy() {
    this.realoadSubscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.realoadSubscription = this.categoryService.getReloadObservable().subscribe(() => {
      this.loadCategories();
    });
  }

  goToItem(categoryId: number) {
    this.navController.navigateForward('/todo/categories/' + categoryId);
  }

  searchCategories(search: any) {
    this.loadCategories(search.detail.value);
  }

  async loadCategories(name: string = null) {
    this.isLoading = true;

    try {
      this.categories = await this.categoryService.getAllCategories(name);

      this.isLoading = false;
    } catch (e) {
      console.error(e);
      this.presentErrorToast();

      this.isLoading = false;
    }
  }

  async add() {
    const modal = await this.modalController.create({
      component: AddComponent,
    });
    return await modal.present();
  }

  async showTools(event: any, id: number) {
    this.popover = await this.popoverController.create({
      component: ToolsComponent,
      event,
      translucent: true,
      componentProps: {
        categoryId: id,
      },
    });

    this.popover.onDidDismiss();

    return await this.popover.present();
  }

  private async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Erro ao carregar categorias.',
      duration: 2000,
    });
    toast.present();
  }
}
