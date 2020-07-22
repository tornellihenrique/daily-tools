import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {
  constructor(public attendaceService: AttendanceService) {}

  ngOnInit(): void {}

  get hasData() {
    return this.attendaceService.data && this.attendaceService.data.length > 0;
  }
}
