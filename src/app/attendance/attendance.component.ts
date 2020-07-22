import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AlertController, LoadingController } from '@ionic/angular';

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

  data: {
    nota: string;
    equipe: string;
    status: string;
    endereco: string;
    descricao: string;
  }[] = [];

  loading: HTMLIonLoadingElement;

  constructor(private alertController: AlertController, private loadingController: LoadingController) {}

  ngOnInit() {}

  async generate() {
    await this.showLoading();

    this.data = [];
    const sheet1 = await this.readFile(this.file1);
    const sheet2 = await this.readFile(this.file2);

    let ccs = [];
    let cwsi = [];

    if (sheet1 && sheet1[0] && sheet1[0]['Local']) {
      ccs = sheet1;
      cwsi = sheet2;
    } else if (sheet2 && sheet2[0] && sheet2[0]['Local']) {
      ccs = sheet2;
      cwsi = sheet1;
    } else {
      this.errorAlert();
    }

    for (const ccsFile of ccs) {
      const cwsiFile = cwsi.find(
        val =>
          (val['STATUS'] === 'Deslocando' || val['STATUS'] === 'Executando') && val['NOTA'] === Number(ccsFile['Nota']),
      );

      if (!cwsiFile) {
        continue;
      }

      this.data.push({
        nota: cwsiFile['NOTA'],
        equipe: cwsiFile['NRO_EQUIPE'],
        status: cwsiFile['STATUS'],
        endereco: `${ccsFile['Rua']} - ${ccsFile['Bairro']} - ${ccsFile['Local']}`,
        descricao: cwsiFile['DSC_SERVICO'],
      });
    }

    this.hideLoading();
  }

  onChangeFile1(event: any) {
    this.file1 = event.target.files[0];
    this.fileName1 = this.file1 ? this.file1.name : '';
  }

  onChangeFile2(event: any) {
    this.file2 = event.target.files[0];
    this.fileName2 = this.file2 ? this.file2.name : '';
  }

  get isInvalid() {
    return !this.file1 || !this.file2;
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Erro!',
      message: 'Planilhas inválidas!',
      buttons: [
        {
          text: 'Ok',
        },
      ],
    });

    await alert.present();
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando...',
    });

    await this.loading.present();
  }

  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  private readFile(file: File): Promise<any> {
    return new Promise((res, rej) => {
      const reader = new FileReader();

      reader.onload = e => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: 'binary',
        });

        workbook.SheetNames.forEach(sheetName => {
          res(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));
        });
      };

      // reader.onloadstart = e => {
      //   this.showLoading();
      // };

      // reader.onloadend = e => {
      //   this.hideLoading();
      // };

      // reader.onprogress = e => {
      //   this.showLoading();
      // };

      reader.readAsBinaryString(file);
    });
  }
}
