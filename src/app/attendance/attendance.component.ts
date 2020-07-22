import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  file1: File;
  file2: File;

  fileName1: string;
  fileName2: string;

  constructor() {}

  ngOnInit() {}

  generate() {
    this.readFile(this.file1).then(obj => console.log(obj));
  }

  get isInvalid() {
    return !this.file1 || !this.file2;
  }

  private readFile(file: File): Promise<any> {
    return new Promise((res, rej) => {
      const reader = new FileReader();

      reader.onload = e => {
        const workbook = XLSX.read(file, {
          type: 'binary',
        });

        workbook.SheetNames.forEach(sheetName => {
          res(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));
        });
      };

      reader.readAsBinaryString(file);
    });
  }
}
