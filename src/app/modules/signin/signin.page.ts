import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserById } from 'src/app/core/models/userById.model';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { AuthResponseData, AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  loginForm: FormGroup;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private router: Router, private alertService: AlertService, private authService: AuthService, private db: AngularFireDatabase, private loadingCtrl: LoadingController) {
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
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Loading...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        authObs = this.authService.login(this.email.value.trim(), this.phone.value);
        authObs.subscribe(
          (resData) => {
            loadingEl.dismiss();
            this.db
              .list("user", (ref) =>
                ref.orderByChild("userId").equalTo(resData.localId)
              )
              .valueChanges()
              .subscribe((res: UserById[]) => {
                this.loginForm.reset();
                this.redirectByStep(res[0].step);
              });
          },
          (errRes) => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let header = `Authentication Failed`;
            let message = code;
            if (code === "EMAIL_NOT_FOUND") {
              message = "Email could not be found";
            }
            this.alertService.alertError(header, message);
          }
        );
      });
      // this.onResetForm();
    }
  }

  redirectByStep(step: number) {
    if (step === 1) {
      this.router.navigateByUrl("/titular");
    } else if (step === 2 ) {
      this.router.navigateByUrl("/dependent");
    } else if (step === 3 ) {
      this.router.navigateByUrl("/employment");
    } else {
      this.router.navigateByUrl("/signin");
    }
  }
}
