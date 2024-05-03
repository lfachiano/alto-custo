import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemessaComponent } from './remessa/remessa.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';




@NgModule({
  declarations: [
    RemessaComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
  ],
  exports: [
    RemessaComponent
  ],
})
export class RemessaModule { }
