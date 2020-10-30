import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  alertPass: string = "";

  constructor(private alertCtrl: AlertController) {}

  alertSuccess(header: string, message: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        buttons: ["Ok"],
      })
      .then((alertEl) => alertEl.present());
  }

  alertError(header: string, message: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        buttons: ["Ok"],
      })
      .then((alertEl) => alertEl.present());
  }

  alertValidation(
    header: string,
    message: string,
    token: string
  ): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    let promise = new Promise<boolean>((resolve) => {
      resolveFunction = resolve;
    });
    this.alertCtrl
      .create({
        header: header,
        message: message,
        inputs: [
          {
            name: "password",
            type: "text",
          },
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Confirm",
            handler: (alertData) => {
              if (alertData.password === token) {
                resolveFunction(true);
              } else {
                resolveFunction(false);
              }
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
    return promise;
  }
}
