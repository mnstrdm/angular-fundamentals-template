import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { User } from "@app/shared/models/user.model";
import { Router } from "@angular/router";
import { AuthenticationFacade } from "@app/store/authentication/authentication.facade";
import { filter, switchMap, take } from "rxjs";
import { UserStateFacade } from "@app/store/user/user.facade";

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

  constructor(
    private router: Router,
    private authenticationFacade: AuthenticationFacade,
    private userStateFacade: UserStateFacade
  ) {}

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authenticationFacade.login(this.user);
      this.authenticationFacade.isLoginLoading$
        .pipe(
          filter((isLoading) => !isLoading),
          take(1),
          switchMap(() => {
            this.userStateFacade.getUser();
            return this.userStateFacade.isUserLoading$.pipe(
              filter((isLoading) => !isLoading),
              take(1)
            );
          })
        )
        .subscribe(() => this.router.navigate(["/courses"]));

      this.loginForm.resetForm();
      this.submitted = false;
    }
  }
}
