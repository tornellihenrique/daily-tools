import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/todo/models/category.model';
import { ModalController, AlertController } from '@ionic/angular';
import { CategoryService } from 'src/app/todo/services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  name: string;
  isLoading: boolean;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private categoryService: CategoryService,
  ) {}

  async create() {
    try {
      this.isLoading = true;
      await this.categoryService.insert({ name: this.name });
      this.categoryService.reload();

      this.isLoading = false;

      this.dismiss();
    } catch (e) {
      console.error(e);

      (
        await this.alertController.create({
          header: 'Erro!',
          message: 'Erro ao criar categoria!',
          buttons: [
            {
              text: 'Ok',
            },
          ],
        })
      ).present();

      this.isLoading = false;
    }
  }

  async dismiss() {
    (await this.modalController.getTop()).dismiss();
  }
}
