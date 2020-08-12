import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from './services/category.service';
import { ItemService } from './services/item.service';
import { ToolsComponent } from './components/category-list/tools/tools.component';
import { AddComponent as AddCategoryComponent } from './components/category-list/add/add.component';
import { AddComponent as AddItemComponent } from './components/item-list/add/add.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent, ItemListComponent, ToolsComponent, AddCategoryComponent, AddItemComponent],
  imports: [CommonModule, FormsModule, IonicModule, TodoRoutingModule],
  providers: [CategoryService, ItemService],
})
export class TodoModule {}
