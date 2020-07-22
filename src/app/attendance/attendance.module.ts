import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolsComponent } from './tools/tools.component';
import { AttendanceService } from './attendance.service';

@NgModule({
  declarations: [AttendanceComponent, ToolsComponent],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, AttendanceRoutingModule],
  providers: [AttendanceService]
})
export class AttendanceModule {}
