import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { CourseInfoModule } from "./features/course-info/course-info.module";
import { AppComponent } from "@app/app.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesService } from "@app/services/courses.service";
import { CourseListModule } from "./features/courses/courses-list/courses-list.module";
import { CoursesModule } from "./features/courses/courses.module";
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "@angular/common";
import { LoginFormModule } from "./shared/components/login-form/login-form.module";
import { RegistrationFormModule } from "./shared/components/registration-form/registration-form.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    CourseInfoModule,
    CourseListModule,
    CoursesModule,
    AppRoutingModule,
    AuthModule,
    CommonModule,
    LoginFormModule,
    RegistrationFormModule,
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
