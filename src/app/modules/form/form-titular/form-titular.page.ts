import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";
import { UserById } from "src/app/core/models/userById.model";
import { AlertService } from "src/app/core/services/alerts/alert.service";
import {
  AuthResponseData,
  AuthService,
} from "src/app/core/services/auth/auth.service";
import { DependentService } from "src/app/core/services/dependent/dependent.service";

@Component({
  selector: "app-form-titular",
  templateUrl: "./form-titular.page.html",
  styleUrls: ["./form-titular.page.scss"],
})
export class FormTitularPage implements OnInit {
  titularForm: FormGroup;
  loadedUserData: UserById[] = [];
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private ssnPattern: any = "^[0-9]*$";
  constructor(
    private alertService: AlertService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private dependentService: DependentService
  ) {
    this.titularForm = this.createForm();
  }

  ngOnInit() {
    this.authService.userId.subscribe((res) => {
      if (res == null) {
        return null;
      }
      this.authService
        .getUserById(res)
        .subscribe((responseUserData: UserById[]) => {
          this.loadedUserData = responseUserData;
          this.titularForm.setValue({
            name: responseUserData[0].infoTitular.name,
            email: responseUserData[0].infoTitular.email,
            phone: responseUserData[0].infoTitular.phone,
            dateOfBirth: responseUserData[0].infoTitular.dateOfBirth,
            countryOfBirth: responseUserData[0].infoTitular.countryOfBirth,
            gender: responseUserData[0].infoTitular.gender,
            maritalStatus: responseUserData[0].infoTitular.maritalStatus,
            ssn: responseUserData[0].infoTitular.ssn,
            address: responseUserData[0].infoTitular.address,
            city: responseUserData[0].infoTitular.city,
            zipcode: responseUserData[0].infoTitular.zipcode,
            citizenStatus: responseUserData[0].infoTitular.citizenStatus,
            citizenshipNumber:
              responseUserData[0].infoTitular.citizenshipNumber,
            alienNumber: responseUserData[0].infoTitular.alienNumber,
            cardNumber: responseUserData[0].infoTitular.cardNumber,
            dateOfWorkPermitExpiration:
              responseUserData[0].infoTitular.dateOfWorkPermitExpiration,
            workPermitCategory:
              responseUserData[0].infoTitular.workPermitCategory,
          });
        });
    });
  }

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
      ssn: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(this.ssnPattern),
      ]),
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
      this.loadingCtrl
        .create({
          keyboardClose: true,
          message: "Loading...",
        })
        .then((loadingEl) => {
          loadingEl.present();

          if (this.loadedUserData.length > 0) {
            const sub = this.dependentService
              .saveTitularChanges(
                this.loadedUserData[0].userKeyId,
                this.name.value,
                this.email.value,
                this.phone.value,
                this.dateOfBirth.value,
                this.countryOfBirth.value,
                this.gender.value,
                this.maritalStatus.value,
                Number(this.ssn.value),
                this.address.value,
                this.city.value,
                this.zipcode.value,
                this.citizenStatus.value,
                this.citizenshipNumber.value,
                this.alienNumber.value,
                this.cardNumber.value,
                this.dateOfWorkPermitExpiration.value,
                this.workPermitCategory.value
              )
              .subscribe(
                (res) => {
                  if (res) {
                    loadingEl.dismiss();
                    sub.unsubscribe();
                    this.router.navigateByUrl("/dependent");
                  }
                },
                (errRes) => {
                  console.log(errRes);
                  loadingEl.dismiss();
                  let header = "Registration Failed";
                  let message = "Could not register you, please try again.";
                  this.alertService.alertError(header, message);
                }
              );
          } else {
            let authObs: Observable<AuthResponseData>;
            authObs = this.authService.signup(
              this.email.value,
              this.phone.value
            );
            authObs.subscribe(
              (resData) => {
                this.authService
                  .createCustomer(
                    resData.localId,
                    this.name.value,
                    this.email.value,
                    this.phone.value,
                    this.dateOfBirth.value,
                    this.countryOfBirth.value,
                    this.gender.value,
                    this.maritalStatus.value,
                    Number(this.ssn.value),
                    this.address.value,
                    this.city.value,
                    this.zipcode.value,
                    this.citizenStatus.value,
                    this.citizenshipNumber.value,
                    this.alienNumber.value,
                    this.cardNumber.value,
                    this.dateOfWorkPermitExpiration.value,
                    this.workPermitCategory.value
                  )
                  .subscribe(
                    (res) => {
                      if (res) {
                        loadingEl.dismiss();
                        this.router.navigateByUrl("/dependent");
                      }
                    },
                    (errRes) => {
                      console.log(errRes);
                      loadingEl.dismiss();
                      let header = "Registration Failed";
                      let message = "Could not register you, please try again.";
                      this.alertService.alertError(header, message);
                    }
                  );
              },
              (errRes) => {
                loadingEl.dismiss();
                const code = errRes.error.error.message;
                let header = "Registration Failed";
                let message = "Could not register you, please try again.";
                if (code === "EMAIL_EXISTS") {
                  message =
                    "Your application has been submited, if you need continue please go to the navigation panel and press continue.";
                }
                this.alertService.alertError(header, message);
              }
            );
          }
        });
    }
  }
}
