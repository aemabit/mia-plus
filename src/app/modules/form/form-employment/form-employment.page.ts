import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form-employment",
  templateUrl: "./form-employment.page.html",
  styleUrls: ["./form-employment.page.scss"],
})
export class FormEmploymentPage implements OnInit {
  employmentForm: FormGroup;

  constructor() {
    this.employmentForm = this.createForm();
  }

  ngOnInit() {}

  get employer() {
    return this.employmentForm.get("employer");
  }
  get annualIncome() {
    return this.employmentForm.get("annualIncome");
  }
  get householdTax() {
    return this.employmentForm.get("householdTax");
  }
  get spouseEmployer() {
    return this.employmentForm.get("spouseEmployer");
  }
  get spouseAnnualIncome() {
    return this.employmentForm.get("spouseAnnualIncome");
  }


  createForm() {
    return new FormGroup({
      employer: new FormControl("", [Validators.required]),
      annualIncome: new FormControl("", [Validators.required]),
      householdTax: new FormControl("", [Validators.required]),
      spouseEmployer: new FormControl(""),
      spouseAnnualIncome: new FormControl(""),
    });
  }

  onSubmitEmploymentForm() {
    if (this.employmentForm.valid) {
      this.onResetForm();
    }
  }

  onResetForm(): void {
    this.employmentForm.reset();
  }
}
