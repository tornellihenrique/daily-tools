import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AttendanceComponent],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, AttendanceRoutingModule],
})
export class AttendanceModule {}
