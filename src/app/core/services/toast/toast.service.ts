import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  async successToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      color: "secondary",
    });
    toast.present();
  }

  async errorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      color: "danger",
    });
    toast.present();
  }
}
