import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDependentPage } from './form-dependent.page';

const routes: Routes = [
  {
    path: '',
    component: FormDependentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormDependentPageRoutingModule {}
