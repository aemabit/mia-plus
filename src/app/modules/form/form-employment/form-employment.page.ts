import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { UserById } from "src/app/core/models/userById.model";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { DependentService } from "src/app/core/services/dependent/dependent.service";
import { SmsService } from "src/app/core/services/sms/sms.service";
import { ToastService } from "src/app/core/services/toast/toast.service";

@Component({
  selector: "app-form-employment",
  templateUrl: "./form-employment.page.html",
  styleUrls: ["./form-employment.page.scss"],
})
export class FormEmploymentPage implements OnInit {
  employmentForm: FormGroup;

  loadedUserData: UserById[] = [];

  constructor(
    private dependentService: DependentService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private router: Router,
    private sms: SmsService
  ) {
    this.employmentForm = this.createForm();
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
          if (this.loadedUserData[0].infoEmployment) {
            this.employmentForm.setValue({
              employer: this.loadedUserData[0].infoEmployment.employer,
              annualIncome: this.loadedUserData[0].infoEmployment.annualIncome,
              householdTax: this.loadedUserData[0].infoEmployment
                .houseHoldTaxes,
              spouseEmployer: this.loadedUserData[0].infoEmployment
                .spouseEmployer,
              spouseAnnualIncome: this.loadedUserData[0].infoEmployment
                .spouseAnnualIcome,
            });
          }
        });
    });
  }

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
      this.loadingCtrl
        .create({
          keyboardClose: true,
          message: "Loading...",
        })
        .then((loadingEl) => {
          loadingEl.present();

          const sub = this.dependentService
            .employInfo(
              this.loadedUserData[0].userKeyId,
              this.employer.value,
              this.annualIncome.value,
              this.householdTax.value,
              this.spouseEmployer.value,
              this.spouseAnnualIncome.value
            )
            .subscribe(
              (res) => {
                if (res) {
                  this.toastService.successToast(
                    "Application has been submited, Thank you!"
                  );
                  sub.unsubscribe();
                  this.smsNotify();
                  this.authService.logout();
                  setTimeout(() => {
                    loadingEl.dismiss();
                    this.router.navigateByUrl("/navigation");
                  }, 1500);
                }
              },
              (error) => {
                console.log(error);
                loadingEl.dismiss();
              }
            );
        });
    }
  }

  smsNotify() {
    const message = `Thank you for providing us with your personal information, you will be contacted soon by one of our agents with the best rates and plans for you.`;
    this.sms
      .sendMsg(`+1${this.loadedUserData[0].infoTitular.phone}`, message)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
}
