import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  loginForm: FormGroup;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get("email");
  }
  get phone() {
    return this.loginForm.get("phone");
  }

  createForm() {
    return new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.emailPattern),
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  onSubmitLoginForm() {
    if (this.loginForm.valid) {
      this.onResetForm();
    }
  }

  onResetForm(): void {
    this.loginForm.reset();
  }
}
