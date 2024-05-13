import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemessaComponent } from './remessa/remessa.component';
import { TipoDocumentoDialogComponent } from './tipo-documento-dialog/tipo-documento-dialog.component';
import { ExportarComponent } from './exportar/exportar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExportarDocumentoDialogComponent } from './exportar-documento-dialog/exportar-documento-dialog.component';






@NgModule({
  declarations: [
    RemessaComponent,
    ExportarComponent,
    TipoDocumentoDialogComponent,
    ExportarDocumentoDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
  ],
  exports: [
    RemessaComponent
  ],
})
export class RemessaModule { }
