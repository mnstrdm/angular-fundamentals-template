import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseFormComponent } from "@app/shared/components";
import { CourseInfoComponent } from "../course-info/course-info.component";
import { CoursesComponent } from "./courses.component";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { AdminGuard } from "@app/user/guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    component: CoursesComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: "add",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard, AdminGuard],
  },
  /*   {
    path: ":id",
    component: CourseInfoComponent,
    canActivate: [AuthorizedGuard],
    canMatch: [AuthorizedGuard],
  }, */
  {
    path: "edit/:id",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
