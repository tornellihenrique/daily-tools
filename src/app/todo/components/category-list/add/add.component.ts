import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/todo/models/category.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  constructor(private modalController: ModalController) {}

  async dismiss() {
    (await this.modalController.getTop()).dismiss();
  }
}
