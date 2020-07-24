import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CategoryService } from 'src/app/todo/services/category.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent {
  @Input() categoryId: number;

  constructor(
    private categoryService: CategoryService,
    private modalController: ModalController,
    private popoverController: PopoverController,
  ) {}

  edit() {}

  async remove() {
    await this.categoryService.remove(this.categoryId);

    this.categoryService.reload();
    this.popoverController.dismiss();
  }
}
