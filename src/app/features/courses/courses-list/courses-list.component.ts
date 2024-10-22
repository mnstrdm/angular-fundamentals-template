import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Course } from "@app/shared/models/course.model";
@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses!: Course[];
  @Input() editable!: boolean;
  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShowCourse(courseId: string) {
   
    this.showCourse.emit(courseId);
  }
  onDeleteCourse(courseId: string) {
    this.deleteCourse.emit(courseId);
  }
  onEditCourse(courseId: string) {
    this.editCourse.emit(courseId);
  }
}
