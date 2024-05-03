import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemessaComponent } from './remessa/remessa.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    RemessaComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    RemessaComponent
  ],
})
export class RemessaModule { }
