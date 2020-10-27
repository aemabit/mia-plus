import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form-dependent",
  templateUrl: "./form-dependent.page.html",
  styleUrls: ["./form-dependent.page.scss"],
})
export class FormDependentPage implements OnInit {
  dependentForm: FormGroup;

  constructor() {
    this.dependentForm = this.createForm();
  }

  ngOnInit() {}

  get name() {
    return this.dependentForm.get("name");
  }
  get gender() {
    return this.dependentForm.get("gender");
  }
  get dateOfBirth() {
    return this.dependentForm.get("dateOfBirth");
  }
  get relation() {
    return this.dependentForm.get("relation");
  }
  get citizenStatus() {
    return this.dependentForm.get("citizenStatus");
  }
  get citizenshipNumber() {
    return this.dependentForm.get("citizenshipNumber");
  }
  get alienNumber() {
    return this.dependentForm.get("alienNumber");
  }
  get cardNumber() {
    return this.dependentForm.get("cardNumber");
  }
  get dateOfWorkPermitExpiration() {
    return this.dependentForm.get("dateOfWorkPermitExpiration");
  }
  get workPermitCategory() {
    return this.dependentForm.get("workPermitCategory");
  }

  createForm() {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(5)]),
      gender: new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required]),
      relation: new FormControl("", [Validators.required]),
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

  onSubmitDependantForm() {
    if (this.dependentForm.valid) {
      this.onResetForm();
    }
  }

  onResetForm(): void {
    this.dependentForm.reset();
  }
}
