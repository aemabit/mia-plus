import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form-titular",
  templateUrl: "./form-titular.page.html",
  styleUrls: ["./form-titular.page.scss"],
})
export class FormTitularPage implements OnInit {
  titularForm: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() {
    this.titularForm = this.createForm();
  }

  ngOnInit() {}

  get name() {
    return this.titularForm.get("name");
  }
  get email() {
    return this.titularForm.get("email");
  }
  get phone() {
    return this.titularForm.get("phone");
  }
  get dateOfBirth() {
    return this.titularForm.get("dateOfBirth");
  }
  get countryOfBirth() {
    return this.titularForm.get("countryOfBirth");
  }
  get gender() {
    return this.titularForm.get("gender");
  }
  get maritalStatus() {
    return this.titularForm.get("maritalStatus");
  }
  get ssn() {
    return this.titularForm.get("ssn");
  }
  get address() {
    return this.titularForm.get("address");
  }
  get city() {
    return this.titularForm.get("city");
  }
  get zipcode() {
    return this.titularForm.get("zipcode");
  }
  get citizenStatus() {
    return this.titularForm.get("citizenStatus");
  }
  get citizenshipNumber() {
    return this.titularForm.get("citizenshipNumber");
  }
  get alienNumber() {
    return this.titularForm.get("alienNumber");
  }
  get cardNumber() {
    return this.titularForm.get("cardNumber");
  }
  get dateOfWorkPermitExpiration() {
    return this.titularForm.get("dateOfWorkPermitExpiration");
  }
  get workPermitCategory() {
    return this.titularForm.get("workPermitCategory");
  }

  createForm() {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(5)]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.emailPattern),
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      dateOfBirth: new FormControl("", [Validators.required]),
      countryOfBirth: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      maritalStatus: new FormControl("", [Validators.required]),
      ssn: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      zipcode: new FormControl("", [Validators.required]),
      citizenStatus: new FormControl(null, [Validators.required]),
      // if not workPermit
      citizenshipNumber: new FormControl(""),
      // if WorkPermit
      alienNumber: new FormControl(""),
      cardNumber: new FormControl(""),
      dateOfWorkPermitExpiration: new FormControl(""),
      workPermitCategory: new FormControl(""),
    });
  }

  onSubmitTitularForm() {
    if (this.titularForm.valid) {
      this.onResetForm();
    }
  }

  onResetForm(): void {
    this.titularForm.reset();
  }
}
