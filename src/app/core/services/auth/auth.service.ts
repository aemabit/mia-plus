import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, from } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/user.model";
import { UserById } from "src/app/core/models/userById.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private _userById = new BehaviorSubject<UserById[]>([]);
  tableUserName = "user";
  signUpURI = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
  signInURI = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;

  private userURI = `${environment.firebaseConfig.databaseURL}/${this.tableUserName}.json`;

  get user() {
    return this._user.asObservable();
  }

  getUserById(userID: string) {
    return this.http
      .get<{ [key: string]: UserById }>(
        `${this.userURI}?orderBy="userId"&equalTo="${userID}"`
      )
      .pipe(
        map((userData) => {
          const lastUser = [];
          for (const key in userData) {
            if (userData.hasOwnProperty(key)) {
              lastUser.push(
                new UserById(
                  // key,
                  userData[key].userKeyId,
                  userData[key].userId,
                  userData[key].step,
                  userData[key].infoTitular,
                  userData[key].infoDependent,
                  userData[key].infoEmployment
                )
              );
            }
          }
          return lastUser;
        }),
        tap((lastUser) => {
          this._userById.next(lastUser);
        })
      );
  }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  autoLogin() {
    return from(Plugins.Storage.get({ key: "authData" })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          userId: string;
          email: string;
          token: string;
          tokenExpirationDate: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signInURI, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(tap(this.setUserData.bind(this)));
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpURI, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
    Plugins.Storage.remove({ key: "authData" });
    this.router.navigateByUrl("/signin");
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 3600
    );
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
    this.storeAuthData(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime.toISOString()
    );
  }

  private storeAuthData(
    userId: string,
    email: string,
    token: string,
    tokenExpirationDate: string
  ) {
    const data = JSON.stringify({ userId, email, token, tokenExpirationDate });
    Plugins.Storage.set({ key: "authData", value: data });
  }

  // CREATE USER
  createCustomer(
    userId: string,
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
    const titular = {
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
    const step = 1;
    const newUser = new UserById("", userId, step, titular, null, null);
    return this.http
      .post<{ name: string }>(this.userURI, {
        ...newUser,
        userId: newUser.userId,
      })
      .pipe(
        tap((resData) => {
          const { name } = resData;
          this.takeName(name);
        })
      );
  }

  takeName(keyIdValue: string) {
    const syncKey = this.db.list("user");
    syncKey.update(keyIdValue, { userKeyId: keyIdValue, NFCKey: keyIdValue });
  }
}
