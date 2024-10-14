import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  CourseFormComponent,
  LoginFormComponent,
  RegistrationFormComponent,
} from "./shared/components";
import { CoursesListComponent } from "./features/courses/courses-list/courses-list.component";
import { CoursesComponent } from "./features/courses/courses.component";
import { CourseInfoComponent } from "./features/course-info/course-info.component";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AdminGuard } from "./user/guards/admin.guard";

export const routes: Routes = [
  /* Add your code here */
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "courses",
    component: CoursesComponent,
    canMatch: [AuthorizedGuard],
  },
  {
    path: "courses/add",
    component: CourseFormComponent,
    canMatch: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: "courses/:id",
    component: CourseInfoComponent,
    canMatch: [AuthorizedGuard],
  },
  {
    path: "courses/edit/:id",
    component: CourseFormComponent,
    canMatch: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },

  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
    canMatch: [AuthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModul {}
