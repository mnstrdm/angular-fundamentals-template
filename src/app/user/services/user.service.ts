import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "@app/shared/constants/baseUrl";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  usersApiUrl = `${BaseUrl}/users`;

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.usersApiUrl}/me`);
  }
}
