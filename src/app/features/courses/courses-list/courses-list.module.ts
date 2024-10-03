import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { CoursesListComponent } from "./courses-list.component";

@NgModule({
  declarations: [CoursesListComponent],
  imports: [CommonModule, SharedModule],
  exports: [CoursesListComponent],
})
export class CourseListModule {}
