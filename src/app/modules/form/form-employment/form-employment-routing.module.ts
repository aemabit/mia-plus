import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEmploymentPage } from './form-employment.page';

const routes: Routes = [
  {
    path: '',
    component: FormEmploymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormEmploymentPageRoutingModule {}
