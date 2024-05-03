import { Component } from '@angular/core';

import * as XLSX from 'xlsx';

type DADOS = any[][];

@Component({
  selector: 'app-remessa',
  templateUrl: './remessa.component.html',
  styleUrls: ['./remessa.component.css']
})
export class RemessaComponent {

  readonly colunasExibidas = ['nome', 'medicamento'];

  nomeDoArquivo: any;
  dados: DADOS = [[], []];

  constructor() {}

  onFileSelected(evt: any) {

    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) {
      this.nomeDoArquivo = `Não é possível utilizar múltiplos arquivos`;
      throw new Error('Não é possível utilizar múltiplos arquivos');
    }


    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      //lê o arquivo
      const bstr: string = e.target.result;
      const arquivo: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      //recupera a primeira planilha
      const nomeDaPlanilha: string = arquivo.SheetNames[0];
      const planilha: XLSX.WorkSheet = arquivo.Sheets[nomeDaPlanilha];
      this.nomeDoArquivo = nomeDaPlanilha;

      //converte o arquivo em array
      this.dados = <DADOS>(XLSX.utils.sheet_to_json(planilha, { header: 1 }));

    };
    reader.readAsBinaryString(target.files[0]);
  }




  export(): void {

  }

}
