import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SmsService {
  private smsURI = `https://sms.aemabit.com/service/sms`;

  constructor(private http: HttpClient) {}

  sendMsg(phone: string, message: string): Observable<any> {
    let body = new URLSearchParams();
    body.set("phone", phone);
    body.set("message", message);
    body.set("token", environment.SMS_TOKEN);

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http.post(this.smsURI, body.toString(), {
      headers,
      responseType: "text",
    });
  }
}
