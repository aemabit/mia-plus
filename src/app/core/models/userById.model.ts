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

export class UserById {
  constructor(
    public userId: string,
    public step: number,
    public infoTitular: Titular
  ) {}
}
