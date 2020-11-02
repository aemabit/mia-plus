import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-step-nav",
  templateUrl: "./step-nav.component.html",
  styleUrls: ["./step-nav.component.scss"],
})
export class StepNavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  routerTo(to: string) {
    if (to === "titular") {
      this.router.navigateByUrl("/titular");
    } else if (to === "dependent") {
      this.router.navigateByUrl("/dependent");
    } else {
      this.router.navigateByUrl("/employment");
    }
  }
}
