import { Injectable } from '@angular/core';
import { TodoService } from '../../providers/todo.service';
import { Category } from '../models/category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CategoryService {
  private reloadObservable = new BehaviorSubject(null);

  constructor(private db: TodoService) {}

  async getCategoryById(id: number) {
    try {
      const dbObj = await this.db.getDB();

      if (!dbObj) {
        throw new Error('Error getting database');
      }

      const sql = 'SELECT c.* FROM categories c WHERE 1=1 AND c.id = ?';

      try {
        const res = await dbObj.executeSql(sql, [id]);
        if (res.rows.length > 0) {
          const category: Category = {
            id: res.rows.item(0).id,
            name: res.rows.item(0).name,
          };

          return category;
        } else {
          return null;
        }
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getAllCategories(name: string = null) {
    try {
      const dbObj = await this.db.getDB();

      if (!dbObj) {
        throw new Error('Error getting database');
      }

      let sql = 'SELECT c.* FROM categories c WHERE 1=1';
      const data = [];

      if (name) {
        sql += ' AND c.name LIKE ?';
        data.push(`%${name}%`);
      }
      try {
        const res = await dbObj.executeSql(sql, data);
        if (res.rows.length > 0) {
          const categories: Category[] = [];

          for (let i = 0; i < res.rows.length; i++) {
            categories.push(res.rows.item(i));
          }

          return categories;
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

  public async insert(category: Category) {
    try {
      const dbObj = await this.db.getDB();

      if (!dbObj) {
        throw new Error('Error getting database');
      }

      const sql = 'INSERT INTO categories (name) values (?)';
      try {
        return dbObj.executeSql(sql, [category.name]);
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async update(category: Category) {
    try {
      const dbObj = await this.db.getDB();

      if (!dbObj) {
        throw new Error('Error getting database');
      }

      const sql = 'UPDATE categories SET name = ? WHERE id = ?';
      const data = [category.name, category.id];
      try {
        return dbObj.executeSql(sql, data);
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async remove(id: number) {
    try {
      const dbObj = await this.db.getDB();

      if (!dbObj) {
        throw new Error('Error getting database');
      }

      const sql1 = 'DELETE FROM items WHERE category_id = ?';

      const sql2 = 'DELETE FROM categories WHERE id = ?';
      try {
        await dbObj.executeSql(sql1, [id]);
        return dbObj.executeSql(sql2, [id]);
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }

  reload() {
    this.reloadObservable.next(null);
  }

  getReloadObservable() {
    return this.reloadObservable;
  }
}
