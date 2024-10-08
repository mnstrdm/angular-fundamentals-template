import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  btnTextLogin: string = "Login";

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginForm.resetForm();
    }
  }
  onLogin() {
    const event = new Event("submit");
    this.loginForm.onSubmit(event);
  }
}
