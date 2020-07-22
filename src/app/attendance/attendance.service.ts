import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { ToolsComponent } from './tools/tools.component';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  file1: File;
  file2: File;

  fileName1: string;
  fileName2: string;

  sheet1: any;
  sheet2: any;

  data: {
    nota: string;
    equipe: string;
    status: string;
    endereco: string;
    descricao: string;
  }[] = [];

  loading: HTMLIonLoadingElement;
  popover: HTMLIonPopoverElement;

  order = 0;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private popoverController: PopoverController,
  ) {}

  async generate() {
    await this.showLoading();

    this.data = [];
    this.sheet1 = null;
    this.sheet2 = null;

    this.readFile(this.file1, 0);
    this.readFile(this.file2, 1);
  }

  finalize() {
    let ccs = [];
    let cwsi = [];

    if (this.sheet1 && this.sheet1[0] && this.sheet1[0]['Local']) {
      ccs = this.sheet1;
      cwsi = this.sheet2;
    } else if (this.sheet2 && this.sheet2[0] && this.sheet2[0]['Local']) {
      ccs = this.sheet2;
      cwsi = this.sheet1;
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

  sort() {
    if (this.order) {
      this.order = 0;

      this.data.sort((a, b) => {
        if (a.status > b.status) {
          return -1;
        }
        if (a.status < b.status) {
          return 1;
        }

        return 0;
      });
    } else {
      this.order = 1;

      this.data.sort((a, b) => {
        if (a.status > b.status) {
          return 1;
        }
        if (a.status < b.status) {
          return -1;
        }

        return 0;
      });
    }
  }

  readFile(file: File, index: number) {
    const reader = new FileReader();

    reader.onload = e => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary',
      });

      workbook.SheetNames.forEach(sheetName => {
        if (index === 0) {
          this.sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        } else if (index === 1) {
          this.sheet2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        }
      });

      if (this.sheet1 && this.sheet2) {
        this.finalize();
      }
    };

    reader.readAsBinaryString(file);
  }

  onChangeFile1(event: any) {
    this.file1 = event.target.files[0];
    this.fileName1 = this.file1 ? this.file1.name : '';
  }

  onChangeFile2(event: any) {
    this.file2 = event.target.files[0];
    this.fileName2 = this.file2 ? this.file2.name : '';
  }

  async showTools(e: any) {
    this.popover = await this.popoverController.create({
      component: ToolsComponent,
      event: e,
      translucent: true,
    });

    return await this.popover.present();
  }

  hideTools() {
    if (this.popover) {
      this.popover.dismiss();
    }
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
}
