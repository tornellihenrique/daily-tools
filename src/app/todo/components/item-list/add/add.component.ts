import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ItemService } from 'src/app/todo/services/item.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @Input() categoryId: number;

  name: string;
  isLoading: boolean;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private itemService: ItemService,
  ) {}

  async create() {
    try {
      this.isLoading = true;
      await this.itemService.insert({ name: this.name, done: 0, categoryId: this.categoryId });
      this.itemService.reload();

      this.isLoading = false;

      this.dismiss();
    } catch (e) {
      console.error(e);

      (
        await this.alertController.create({
          header: 'Erro!',
          message: 'Erro ao criar item!',
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
