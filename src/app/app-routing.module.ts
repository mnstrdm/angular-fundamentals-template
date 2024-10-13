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

export const routes: Routes = [
  /* Add your code here */
  {
    path: "login",
    component: LoginFormComponent,
  },
  { path: "registration", component: RegistrationFormComponent },
  {
    path: "courses",
    component: CoursesComponent,
  },
  {
    path: "courses/add",
    component: CourseFormComponent,
  },
  {
    path: "courses/:id",
    component: CourseInfoComponent,
  },
  {
    path: "courses/edit/:id",
    component: CourseFormComponent,
  },

  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModul {}
