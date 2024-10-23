import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";
import { SharedModule } from "@app/shared/shared.module";
import { CourseListModule } from "./courses-list/courses-list.module";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CoursesRoutingModule } from "./courses-routing.module";

import { StoreModule } from "@ngrx/store";
import * as fromCourses from "@app/store/courses/courses.reducer";

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    SharedModule,
    CommonModule,
    CourseListModule,
    RouterOutlet,
    CoursesRoutingModule,
    StoreModule.forFeature(
      fromCourses.coursesFeatureKey,
      fromCourses.coursesReducer
    ),
  ],
  exports: [CoursesComponent],
})
export class CoursesModule {}
