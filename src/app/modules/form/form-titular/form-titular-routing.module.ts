import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTitularPage } from './form-titular.page';

const routes: Routes = [
  {
    path: '',
    component: FormTitularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTitularPageRoutingModule {}
