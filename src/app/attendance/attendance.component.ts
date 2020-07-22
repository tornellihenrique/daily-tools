import { Component, OnInit } from '@angular/core';
import { AttendanceService } from './attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  constructor(public attendanceService: AttendanceService) {}

  ngOnInit() {}

  get isInvalid() {
    return !this.attendanceService.file1 || !this.attendanceService.file2;
  }
}
