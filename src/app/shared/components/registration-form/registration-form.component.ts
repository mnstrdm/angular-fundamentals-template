import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { emailValidator } from "@app/shared/directives/email.directive";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  btnTextRegistration: string = ButtonLabels.registration;
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(null, [Validators.required, emailValidator()]),
      password: new FormControl(null, Validators.required),
    });
  }
  submitted: boolean = false;

  get name() {
    return this.registrationForm.get("name");
  }

  get email() {
    return this.registrationForm.get("email");
  }

  get password() {
    return this.registrationForm.get("password");
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.submitted = false;
      this.registrationForm.reset();
    }
  }
}
