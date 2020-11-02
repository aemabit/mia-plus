import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { StepNavComponent } from './step-nav/step-nav.component';

@NgModule({
  imports: [CommonModule, IonicModule.forRoot()],
  declarations: [HeaderComponent, FooterComponent, StepNavComponent],
  providers: [],
  exports: [HeaderComponent, FooterComponent, StepNavComponent],
})
export class SharedModule {}
