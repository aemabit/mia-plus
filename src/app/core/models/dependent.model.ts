export class Dependent {
    constructor(
        public name: string,
        public gender: string,
        public dateOfBirth: any,
        public relation: string,
        public citizenStatus: string,
        // if not workPermit
        public citizenshipNumber: any,
        // if WorkPermit
        public alienNumber: any,
        public cardNumber: any,
        public dateOfWorkPermitExpiration: any,
        public workPermitCategory: string,
    ) {}
  }