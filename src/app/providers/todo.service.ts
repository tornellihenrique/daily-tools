import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private sqlite: SQLite) {}

  public getDB() {
    return this.sqlite.create({
      name: 'todo.db',
      location: 'default',
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
      [
        'CREATE TABLE IF NOT EXISTS items (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, done INTEGER NOT NULL CHECK (done IN (0,1)), category_id INTEGER, FOREIGN KEY(category_id) REFERENCES categories(id))',
      ],
    ])
      .then(() => console.log('Tables created successfully!'))
      .catch(e => console.error('Error creating tables!', e));
  }

  private async insertDefaultItems(db: SQLiteObject) {
    try {
      const data = await db.executeSql('SELECT COUNT(id) as quantity FROM categories', []);

      if (data.rows.item(0).quantity === 0) {
        try {
          await db.sqlBatch([
            ['INSERT INTO categories (name) VALUES (?)', ['Compras']],
            ['INSERT INTO categories (name) VALUES (?)', ['Tarefas']],
            ['INSERT INTO categories (name) VALUES (?)', ['Trabalho']],
          ]);

          console.log('Standard data created successfully!');
        } catch (e) {
          console.error('Error creating standard data!', e);
        }
      }
    } catch (e) {
      console.error('Error querying quantity of categories!', e);
    }
  }
}
