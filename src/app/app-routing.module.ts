import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { CourseInfoComponent } from "./features/course-info/course-info.component";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

export const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./shared/components/login-form/login-form.module").then(
        (m) => m.LoginFormModule
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    loadChildren: () =>
      import(
        "./shared/components/registration-form/registration-form.module"
      ).then((m) => m.RegistrationFormModule),
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
  },

  {
    path: "courses/:id",
    component: CourseInfoComponent,
    canLoad: [AuthorizedGuard],
  },

  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
    canMatch: [AuthorizedGuard],
  },

  {
    path: "**",
    redirectTo: "/courses",
    canMatch: [AuthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
