import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from './services/category.service';
import { ItemService } from './services/item.service';
import { ToolsComponent } from './components/category-list/tools/tools.component';
import { AddComponent } from './components/category-list/add/add.component';

@NgModule({
  declarations: [CategoryListComponent, ItemListComponent, ToolsComponent, AddComponent],
  imports: [CommonModule, IonicModule, TodoRoutingModule],
  providers: [CategoryService, ItemService],
})
export class TodoModule {}
