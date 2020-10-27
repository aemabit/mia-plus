import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form-upload-documents",
  templateUrl: "./form-upload-documents.page.html",
  styleUrls: ["./form-upload-documents.page.scss"],
})
export class FormUploadDocumentsPage implements OnInit {
  codeForm: FormGroup;
  codeApproval: boolean = false;
  userAplicationType: string = "";

  fb;
  validation1;
  validation2;
  validation3;
  validation4;

  constructor() {
    this.codeForm = this.createForm();
  }

  ngOnInit() {
    this.codeApproval = false;
  }

  ionViewDidEnter() {
    this.codeApproval = false;
    this.fb = null;
    this.validation1 = null;
    this.validation2 = null;
    this.validation3 = null;
    this.validation4 = null;
  }

  get code() {
    return this.codeForm.get("code");
  }

  createForm() {
    return new FormGroup({
      code: new FormControl("", [Validators.required]),
    });
  }

  verifyCode() {
    console.log(this.code.value);
    this.codeApproval = true;
    this.userAplicationType = "other";
  }

  onFileSelected() {}

  onUploadDocs() {
    if (
      this.userAplicationType === "citizen" ||
      this.userAplicationType === "resident"
    ) {
      const valid =
        this.validation1 && this.validation2 && this.validation3 ? true : false;
      if (!valid) {
        console.log("invalid");
        return null;
      }
      console.log(valid);
    } else if (this.userAplicationType === "other") {
      const valid =
        this.validation1 &&
        this.validation2 &&
        this.validation3 &&
        this.validation4
          ? true
          : false;

      if (!valid) {
        console.log("invalid");
        return null;
      }
      console.log(valid);
    } else {
      return null;
    }
  }
}
