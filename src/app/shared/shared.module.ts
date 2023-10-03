import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modal/error-modal/error-modal.component';
import { SuccessModalComponent } from './modal/success-modal/success-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    ErrorModalComponent,
    SuccessModalComponent
  ]
})
export class SharedModule { }
