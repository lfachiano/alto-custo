import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { ItemDeRemessa } from 'src/app/tipos/item-de-remessa';
import { TipoDeDocumentoSelect } from 'src/app/tipos/tipo-de-documento-select';

@Component({
  selector: 'app-tipo-documento-dialog',
  templateUrl: './tipo-documento-dialog.component.html',
  styleUrls: ['./tipo-documento-dialog.component.css']
})
export class TipoDocumentoDialogComponent {

  itemRemessa: ItemDeRemessa = {
    nome: "",
    medicamento: "",
    tipoDeDocumento: ""
  }

  valores: TipoDeDocumentoSelect[] = [
    {value: 'tipo01', texto: 'Tipo 01'},
    {value: 'tipo02', texto: 'Tipo 02'},
    {value: 'tipo03', texto: 'Tipo 03'}
  ];

  constructor(
    public dialogRef: MatDialogRef<TipoDocumentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemDeRemessa,
  ) {

    this.itemRemessa.nome = data.nome;
    this.itemRemessa.medicamento = data.medicamento;
    this.itemRemessa.tipoDeDocumento = this.valores[0].texto;

   }

  onConfirm(result: boolean): void {
    this.dialogRef.close(this.itemRemessa);
  }
}
