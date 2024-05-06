import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Form } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ItemDeRemessa } from 'src/app/tipos/item-de-remessa';

import * as XLSX from 'xlsx';
import { TipoDocumentoDialogComponent } from '../tipo-documento-dialog/tipo-documento-dialog.component';

type DADOS = any[][];

@Component({
  selector: 'app-remessa',
  templateUrl: './remessa.component.html',
  styleUrls: ['./remessa.component.css']
})
export class RemessaComponent {

  readonly colunasDaPlanilha = ['nome', 'medicamento', 'selecionar'];
  readonly colunasDaRemessa = ['nome', 'medicamento', 'tipo', 'excluir'];

  nomeDoArquivo: any;
  dados: DADOS = [];
  itens = new MatTableDataSource<ItemDeRemessa>();

  constructor(
    private service: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.service.clear();
  }

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


  usar(item: any) {


    let tipo = this.selecionarTipoDeDocumento();


      let ir: ItemDeRemessa = {
        nome: item[0],
        medicamento: item[4],
        tipoDeDocumento: tipo
      }

      let aux = this.itens.data;
      aux.push(ir);
      this.itens.connect().next(aux);


  }

  remover(ir: ItemDeRemessa) {

    let itensderemessa = this.itens.data;
    let index = itensderemessa.indexOf(ir);

    if (index > -1) {
      itensderemessa.splice(index, 1);
    }

    this.itens.connect().next(itensderemessa);

  }

  gerarDocumento() {
    console.log(`Gerar Documento`);
  }


  async selecionarTipoDeDocumento() {

    const dialog = this.dialog.open(TipoDocumentoDialogComponent);
    await dialog.afterClosed().subscribe(tipo => {
      return tipo;
    });

    return "";
  }


}
