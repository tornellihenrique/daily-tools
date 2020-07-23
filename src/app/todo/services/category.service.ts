import { Injectable } from '@angular/core';
import { TodoService } from '../../providers/todo.service';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
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

      const sql = 'DELETE FROM categories WHERE id = ?';
      try {
        return dbObj.executeSql(sql, [id]);
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
