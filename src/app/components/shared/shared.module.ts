import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent, FooterComponent],
  providers: [],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
