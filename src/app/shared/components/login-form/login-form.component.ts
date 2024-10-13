import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { AuthService } from "@app/auth/services/auth.service";
import { User } from "@app/shared/models/user.model";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  btnTextLogin: string = ButtonLabels.login;
  submitted: boolean = false;
  user!: User;

  constructor(private authService: AuthService) {}

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      console.log(this.user);
      this.authService.login(this.user).subscribe({
        next: (response) =>
          console.log("Login successful with response: ", response),
        error: (err) => console.log("login failed with error: ", err),
      });
      this.loginForm.resetForm();
      this.submitted = false;
    }
  }
}
