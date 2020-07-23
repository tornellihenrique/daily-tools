import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ItemService } from '../../services/item.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  isLoadingCategoryInfo: boolean;
  isLoadingItems: boolean;

  categoryName: string;
  categoryId: number;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private itemService: ItemService,
    private toastController: ToastController,
  ) {}

  ionViewDidEnter() {
    this.categoryId = Number(this.route.snapshot.params.id);

    this.loadCategoryInfo();
    this.loadItems();
  }

  async loadItems(search: string = null) {}

  async loadCategoryInfo() {
    this.isLoadingCategoryInfo = true;

    try {
      const category = await this.categoryService.getCategoryById(this.categoryId);

      this.categoryName = category.name;

      this.isLoadingCategoryInfo = false;
    } catch (e) {
      console.error(e);
      this.presentErrorToast();

      this.isLoadingCategoryInfo = false;
    }
  }

  private async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Erro ao carregar item.',
      duration: 2000,
    });
    toast.present();
  }
}
