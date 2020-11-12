import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-selector",
  templateUrl: "./home-selector.page.html",
  styleUrls: ["./home-selector.page.scss"],
})
export class HomeSelectorPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  redirectTo() {
    window.location.href = "https://miaplus.vercel.app/";
  }
}
