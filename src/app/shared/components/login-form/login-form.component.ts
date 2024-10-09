import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ButtonLabels } from "@app/shared/constants/button-labels";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  btnTextLogin: string = ButtonLabels.login;
  submitted: boolean = false;

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginForm.resetForm();
      this.submitted = false;
    }
  }
}
