import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";
import { SharedModule } from "@app/shared/shared.module";
import { CourseListModule } from "./courses-list/courses-list.module";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CoursesRoutingModule } from "./courses-routing.module";

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    SharedModule,
    CommonModule,
    CourseListModule,
    RouterOutlet,
    CoursesRoutingModule,
  ],
  exports: [CoursesComponent],
})
export class CoursesModule {}
