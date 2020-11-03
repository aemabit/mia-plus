import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { UserById } from "src/app/core/models/userById.model";
import { AlertService } from "src/app/core/services/alerts/alert.service";
import { DependentService } from "src/app/core/services/dependent/dependent.service";
import { ToastService } from "src/app/core/services/toast/toast.service";
import { AuthService } from "src/app/core/services/auth/auth.service";

@Component({
  selector: "app-form-upload-documents",
  templateUrl: "./form-upload-documents.page.html",
  styleUrls: ["./form-upload-documents.page.scss"],
})
export class FormUploadDocumentsPage implements OnInit {
  userAplicationType: string = "";
  downloadURL: Observable<string>;
  loadedUserData: UserById[];

  fb;
  validation1;
  validation2;
  validation3;
  validation4;

  constructor(
    private toastService: ToastService,
    private storage: AngularFireStorage,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private db: AngularFireDatabase,
    private dependentService: DependentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userId.subscribe((res) => {
      if (res == null) {
        return null;
      }
      this.authService
        .getUserById(res)
        .subscribe((responseUserData: UserById[]) => {
          this.loadedUserData = responseUserData;
          if (this.loadedUserData.length > 0) {
            this.userAplicationType =
              responseUserData[0].infoTitular.citizenStatus;
          }
          if (this.loadedUserData[0].infoDocs) {
            this.validation1 = this.loadedUserData[0].infoDocs.doc1
              ? this.loadedUserData[0].infoDocs.doc1
              : null;
            this.validation2 = this.loadedUserData[0].infoDocs.doc2
              ? this.loadedUserData[0].infoDocs.doc2
              : null;
            this.validation3 = this.loadedUserData[0].infoDocs.doc3
              ? this.loadedUserData[0].infoDocs.doc3
              : null;
            this.validation4 = this.loadedUserData[0].infoDocs.doc4
              ? this.loadedUserData[0].infoDocs.doc4
              : null;
          }
        });
    });
  }

  ionViewDidEnter() {
    this.fb = null;
    this.validation1 = null;
    this.validation2 = null;
    this.validation3 = null;
    this.validation4 = null;
  }

  onFileSelected(event, from: string) {
    console.log(from);
    if (event.target.files[0].size > 2042880) {
      this.toastService.errorToast("The file size is too large. max: 2mb");
      return null;
    }
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Loading...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        let n = Date.now();
        const file = event.target.files[0];
        const filePath = `docs/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage
          .upload(filePath, file)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe((url) => {
                if (url) {
                  loadingEl.dismiss();
                  if (from === "valid1") {
                    this.validation1 = url;
                  } else if (from === "valid2") {
                    this.validation2 = url;
                  } else if (from === "valid3") {
                    this.validation3 = url;
                  } else if (from === "valid4") {
                    this.validation4 = url;
                  } else {
                    null;
                  }
                }
              });
            })
          )
          .subscribe(
            (uploadTask) => {
              if (uploadTask) {
                console.log("Working...");
              }
            },
            (errRes) => {
              if (errRes) {
                loadingEl.dismiss();
                let header = "Upload failed";
                let message = "Could not upload image, please try again.";
                this.alertService.alertError(header, message);
              }
            }
          );
      });
  }

  onUploadDocs() {
    if (
      this.userAplicationType === "Citizen" ||
      this.userAplicationType === "Resident"
    ) {
      const valid =
        this.validation1 || this.validation2 || this.validation3 ? true : false;
      if (!valid) {
        return null;
      }

      this.dependentService.updateDocs(
        this.loadedUserData[0].userKeyId,
        this.validation1,
        this.validation2,
        this.validation3,
        null
      ).subscribe(res => {
        if(res){
          this.toastService.successToast("Documents uploaded.")
        }
      });
    } else if (
      this.userAplicationType === "Working Permit" ||
      this.userAplicationType === "Parol" ||
      this.userAplicationType === "Huellas"
    ) {
      const valid =
        this.validation1 ||
        this.validation2 ||
        this.validation3 ||
        this.validation4
          ? true
          : false;

      if (!valid) {
        console.log("invalid");
        return null;
      }

      this.dependentService.updateDocs(
        this.loadedUserData[0].userKeyId,
        this.validation1,
        this.validation2,
        this.validation3,
        this.validation4
      ).subscribe(res => {
        if(res){
          this.toastService.successToast("Documents uploaded.")
        }
      });
    } else {
      return null;
    }
  }
}
