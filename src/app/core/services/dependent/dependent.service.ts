import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Dependent } from "../../models/dependent.model";

@Injectable({
  providedIn: "root",
})
export class DependentService {
  constructor(private db: AngularFireDatabase) {}

  saveDependents(userKeyId: string, infoDependent: Dependent[]) {
    const userRef = this.db.list("user");
    userRef.update(userKeyId, { infoDependent });
    return userRef.valueChanges();
  }

  updateStatus(userKeyId: string, step: number) {
    const userRef = this.db.list("user");
    userRef.update(userKeyId, { step });
    return userRef.valueChanges();
  }

  updateDependents(userKeyId: string, infoDependent: Dependent[]) {
    const userRef = this.db.list("user");
    userRef.update(userKeyId, { infoDependent });
    return userRef.valueChanges();
  }

  employInfo(
    userKeyId: string,
    employer: string,
    annualIncome: number,
    houseHoldTaxes: string,
    spouseEmployer: string,
    spouseAnnualIcome: number
  ) {
    const infoEmployment = {
      employer,
      annualIncome,
      houseHoldTaxes,
      spouseEmployer,
      spouseAnnualIcome,
    };
    const step = 3;

    const userRef = this.db.list("user");
    userRef.update(userKeyId, { step, infoEmployment });
    return userRef.valueChanges();
  }

  saveTitularChanges(
    userKeyId: string,
    name: string,
    email: string,
    phone: any,
    dateOfBirth: any,
    countryOfBirth: string,
    gender: string,
    maritalStatus: string,
    ssn: number,
    address: string,
    city: string,
    zipcode: any,
    citizenStatus: string,
    citizenshipNumber: any,
    alienNumber: any,
    cardNumber: any,
    dateOfWorkPermitExpiration: any,
    workPermitCategory: string
  ) {
    const infoTitular = {
      name,
      email,
      phone,
      dateOfBirth,
      countryOfBirth,
      gender,
      maritalStatus,
      ssn,
      address,
      city,
      zipcode,
      citizenStatus,
      citizenshipNumber,
      alienNumber,
      cardNumber,
      dateOfWorkPermitExpiration,
      workPermitCategory,
    };
    const userRef = this.db.list("user");
    userRef.update(userKeyId, { infoTitular });
    return userRef.valueChanges();
  }
}
