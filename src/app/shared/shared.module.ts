import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalComponent } from "./components/modal/modal.component";
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  CourseFormComponent,
} from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DurationPipe } from "./pipes/duration.pipe";
import { CustomDatePipe } from "./pipes/custom-date.pipe";
import { EmailValidatorDirective } from "@shared/directives/email.directive";
import { RouterModule } from "@angular/router";
import { AuthModule } from "@app/auth/auth.module";
import { UserModule } from "@app/user/user.module";
const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  CourseFormComponent,
  DurationPipe,
  CustomDatePipe,
  EmailValidatorDirective,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthModule,
    UserModule,
  ],
  exports: [components],
})
export class SharedModule {}
