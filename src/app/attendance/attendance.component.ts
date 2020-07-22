import { Component, OnInit } from '@angular/core';
import { AttendanceService } from './attendance.service';
import { ToolsComponent } from './tools/tools.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  constructor(public attendanceService: AttendanceService) {}

  ngOnInit() {}

  showTools(e: any) {
    this.attendanceService.showTools(e, ToolsComponent);
  }

  get isInvalid() {
    return !this.attendanceService.file1 || !this.attendanceService.file2;
  }
}
