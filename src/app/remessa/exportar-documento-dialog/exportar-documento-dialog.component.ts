import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DadosParaRelatorio } from 'src/app/tipos/dados-para-relatorio';

@Component({
  selector: 'app-exportar-documento-dialog',
  templateUrl: './exportar-documento-dialog.component.html',
  styleUrls: ['./exportar-documento-dialog.component.css']
})
export class ExportarDocumentoDialogComponent {

  dados: DadosParaRelatorio = {
    destinatario: "",
    data: ""
  };

  constructor(
    public dialogRef: MatDialogRef<ExportarDocumentoDialogComponent>
  ) {
   }

  onConfirm(result: boolean): void {
    this.dialogRef.close(this.dados);
  }

}
