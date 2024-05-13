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
    origem: `ESF-II “ROBERTO CETARA DOS SANTOS” – INDIANA - SP`,
    destinatario: `FARMÁCIA DE MEDICAMENTO ESPECIALIZADO DE PRESIDENTE`,
    assunto: "",
    data: "",
    obrservacao: "DEVOLVER UMA VIA ASSINADA"
  };

  constructor(
    public dialogRef: MatDialogRef<ExportarDocumentoDialogComponent>
  ) {

    const agora = Date.now();
    const hoje = new Date(agora);
    this.dados.data = hoje.toLocaleDateString();

   }

  onConfirm(result: boolean): void {

    this.dados.origem = this.dados.origem.toUpperCase();
    this.dados.destinatario = this.dados.destinatario.toUpperCase();
    this.dados.assunto = this.dados.assunto.toUpperCase();
    this.dados.obrservacao = this.dados.obrservacao.toUpperCase();

    this.dialogRef.close(this.dados);
  }

}
