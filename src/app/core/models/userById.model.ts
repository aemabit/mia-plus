import { Dependent } from './dependent.model';

export interface Titular {
  name: string;
  email: string;
  phone: any;
  dateOfBirth: any;
  countryOfBirth: string;
  gender: string;
  maritalStatus: string;
  ssn: number;
  address: string;
  city: string;
  zipcode: any;
  citizenStatus: string;
  citizenshipNumber: any;
  alienNumber: any;
  cardNumber: any;
  dateOfWorkPermitExpiration: any;
  workPermitCategory: string;
}

export interface Employment{
  employer: string,
  annualIncome: number,
  houseHoldTaxes: string,
  spouseEmployer: string,
  spouseAnnualIcome: number
}

export class UserById {
  constructor(
    public userKeyId: string,
    public userId: string,
    public step: number,
    public infoTitular: Titular,
    public infoDependent: Dependent[],
    public infoEmployment: Employment
  ) {}
}
