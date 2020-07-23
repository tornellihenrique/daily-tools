import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  categories: Category[] = [];
  isLoading: boolean;

  constructor(
    private categoryService: CategoryService,
    private toastController: ToastController,
    private navController: NavController,
  ) {}

  ionViewDidEnter() {
    this.loadCategories();
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

  private async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Erro ao carregar categorias.',
      duration: 2000,
    });
    toast.present();
  }
}
