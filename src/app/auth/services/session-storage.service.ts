import { Inject, Injectable } from "@angular/core";
import { WINDOW } from "./window.provider";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string) {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    this.window.sessionStorage.removeItem(TOKEN);
  }

  hasToken() {
    return this.getToken() ? true : false;
  }
}
