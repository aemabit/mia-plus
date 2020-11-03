import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Dependent } from "src/app/core/models/dependent.model";
import { UserById } from "src/app/core/models/userById.model";
import { AlertService } from "src/app/core/services/alerts/alert.service";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { DependentService } from "src/app/core/services/dependent/dependent.service";
import { ToastService } from "src/app/core/services/toast/toast.service";

@Component({
  selector: "app-form-dependent",
  templateUrl: "./form-dependent.page.html",
  styleUrls: ["./form-dependent.page.scss"],
})
export class FormDependentPage implements OnInit {
  dependentForm: FormGroup;

  groupDependent: Dependent[] = [];

  loadedUserData: UserById[] = [];

  constructor(
    private dependantService: DependentService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private alertService: AlertService
  ) {
    this.dependentForm = this.createForm();
  }

  ngOnInit() {
    this.authService.userId.subscribe((res) => {
      if (res == null) {
        // this.router.navigateByUrl("/navigation");
        return null;
      }
      this.authService
        .getUserById(res)
        .subscribe((responseUserData: UserById[]) => {
          this.loadedUserData = responseUserData;
          this.groupDependent = responseUserData[0].infoDependent;
        });
    });
  }

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

  saveDependant() {
    if (!this.loadedUserData) {
      return null;
    }

    const name: string = this.name.value;
    const gender: string = this.gender.value;
    const birth = this.dateOfBirth.value;
    const relation: string = this.relation.value;
    const citizen: string = this.citizenStatus.value;
    const cnumber = this.citizenshipNumber.value;
    const alien = this.alienNumber.value;
    const card = this.cardNumber.value;
    const exp = this.dateOfWorkPermitExpiration.value;
    const permit: string = this.workPermitCategory.value;

    const depend: Dependent = {
      name,
      gender,
      dateOfBirth: birth,
      relation,
      citizenStatus: citizen,
      citizenshipNumber: cnumber,
      alienNumber: alien,
      cardNumber: card,
      dateOfWorkPermitExpiration: exp,
      workPermitCategory: permit,
    };

    if (this.loadedUserData[0].infoDependent) {
      this.loadedUserData[0].infoDependent.push(depend);
      const sub = this.dependantService
        .saveDependents(
          this.loadedUserData[0].userKeyId,
          this.loadedUserData[0].infoDependent
        )
        .subscribe((res) => {
          this.toastService.successToast("Saved Dependent");
          this.dependentForm.reset();
          sub.unsubscribe();
        });
    } else {
      const newDependent: Dependent[] = [];
      newDependent.push(depend);
      const sub = this.dependantService
        .saveDependents(this.loadedUserData[0].userKeyId, newDependent)
        .subscribe((res) => {
          this.toastService.successToast("Saved Dependent");
          this.dependentForm.reset();
          sub.unsubscribe();
        });
    }
  }

  deleteDependent(indexDependent) {
    this.groupDependent.splice(indexDependent, 1);
    const sub = this.dependantService
      .updateDependents(this.loadedUserData[0].userKeyId, this.groupDependent)
      .subscribe((res) => {
        this.toastService.successToast("Removed Dependent");
        sub.unsubscribe();
      });
  }

  onSubmitDependantForm() {
    this.alertService
      .alertValidation(
        "Continue?",
        "The contribution will be affected by the number of dependents that you declare. are you sure to continue? "
      )
      .then((res) => {
        if (res) {
          this.dependantService
            .updateStatus(this.loadedUserData[0].userKeyId, 2)
            .subscribe((res) => {
              if (res) {
                this.router.navigateByUrl("employment");
              }
            });
        }
      });
  }
}
