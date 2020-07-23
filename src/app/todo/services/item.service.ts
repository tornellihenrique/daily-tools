import { Injectable } from '@angular/core';
import { TodoService } from 'src/app/providers/todo.service';
import { Item } from '../models/item.model';

@Injectable()
export class ItemService {
  constructor(private db: TodoService) {}

  async getItems(categoryId: number, name: string = null) {
    try {
      const dbObj = await this.db.getDB();

      if (!dbObj) {
        throw new Error('Error getting database');
      }

      let sql = 'SELECT i.* FROM items i WHERE 1=1 AND i.category_id = ?';
      const data: any = [categoryId];

      if (name) {
        sql += ' AND i.name LIKE ?';
        data.push(`%${name}%`);
      }

      try {
        const res = await dbObj.executeSql(sql, data);
        if (res.rows.length > 0) {
          const items: Item[] = [];

          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              name: res.rows.item(i).name,
              done: res.rows.item(i).done ? true : false,
              categoryId: res.rows.item(i).category_id,
            });
          }

          return items;
        } else {
          return [];
        }
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
