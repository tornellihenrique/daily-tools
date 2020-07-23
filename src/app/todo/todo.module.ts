import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from './services/category.service';
import { ItemService } from './services/item.service';

@NgModule({
  declarations: [CategoryListComponent, ItemListComponent],
  imports: [CommonModule, IonicModule, TodoRoutingModule],
  providers: [CategoryService, ItemService],
})
export class TodoModule {}
