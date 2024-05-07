import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Form } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ItemDeRemessa } from 'src/app/tipos/item-de-remessa';

import jspdf from 'jspdf';
import * as XLSX from 'xlsx';
import { TipoDocumentoDialogComponent } from '../tipo-documento-dialog/tipo-documento-dialog.component';
import { ExportarDocumentoDialogComponent } from '../exportar-documento-dialog/exportar-documento-dialog.component';
import { DadosParaRelatorio } from 'src/app/tipos/dados-para-relatorio';

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


    const dialog = this.dialog.open(TipoDocumentoDialogComponent, {
      data: {
        nome: item[0],
        medicamento: item[4],
        tipoDeDocumento: ''
      }
    });

    dialog.afterClosed().subscribe(result => {
      let aux = this.itens.data;
      aux.push(result);
      this.itens.connect().next(aux);
    });

  }

  remover(ir: ItemDeRemessa) {

    let itensderemessa = this.itens.data;
    let index = itensderemessa.indexOf(ir);

    if (index > -1) {
      itensderemessa.splice(index, 1);
    }

    this.itens.connect().next(itensderemessa);

  }

  exportar() {
    const dialog = this.dialog.open(ExportarDocumentoDialogComponent);

    dialog.afterClosed().subscribe(result => {
      this.gerarDocumento(result);
    });
  }

  gerarDocumento(componentes: DadosParaRelatorio) {

    let nomeDoDestinatario = componentes.destinatario
    let data = componentes.data;

    let documento = new jspdf('p', 'mm', 'a4');

    //adiociona o cabeçalho
    documento.addImage("assets/cabecalho-indiana.jpg", "JPEG", 0, 0, 200, 30);

    //Título
    let titulo = `RELAÇÃO DE REMESSA`;
    documento.setFontSize(20);
    documento.text(titulo, 65, 50);

    //Destinatário
    let destinatario = `Aos cuidados do(a) senhor(a)`;
    documento.setFontSize(12);
    documento.text(destinatario, 10, 70);
    documento.text(nomeDoDestinatario, 10, 75);

    //relação de documentos
    documento.setFontSize(9);
    let dados =  this.itens.data;
    let linha = 90
    for (let i=0; i<dados.length; i++) {
      documento.text(`${(i+1)}) ${dados[i].nome} - ${dados[i].medicamento} - ${dados[i].tipoDeDocumento}`, 15, linha);
      linha += 5;

      if (linha >= 250) {
        documento.addPage('a4');
        documento.addImage("assets/cabecalho-indiana.jpg", "JPEG", 0, 0, 200, 30);
        linha = 50;
      }

    }


    //encerramento
    documento.setFontSize(12);
    documento.text(`Indiana/SP, ${data}`, 150, 250);

    //abre o arquivo em uma nova aba
    documento.output("dataurlnewwindow");

  }



}
