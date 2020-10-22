import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPaymentPageRoutingModule } from './form-payment-routing.module';

import { FormPaymentPage } from './form-payment.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPaymentPageRoutingModule,
    SharedModule
  ],
  declarations: [FormPaymentPage]
})
export class FormPaymentPageModule {}
