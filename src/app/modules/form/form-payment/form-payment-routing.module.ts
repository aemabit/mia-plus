import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPaymentPage } from './form-payment.page';

const routes: Routes = [
  {
    path: '',
    component: FormPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPaymentPageRoutingModule {}
