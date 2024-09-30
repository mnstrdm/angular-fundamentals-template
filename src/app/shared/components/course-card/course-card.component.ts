import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}
@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() isEditabel!: boolean;
  @Input() course!: Course;

  @Output() clickOnShow: EventEmitter<string> = new EventEmitter();
  @Output() clickOnDelete: EventEmitter<string> = new EventEmitter();
  @Output() clickOnEdit: EventEmitter<string> = new EventEmitter();

  id: string = "";
  title: string = "";
  description: string = "";
  creationDate: string = "";
  duration: number = 0;
  authors: string[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.id = this.course.id;
    this.title = this.course.title;
    this.description = this.course.description;
    //possible future formats
    /* this.creationDate = this.coursesService.formatCreationDate(
      this.course.creationDate
    ); 
    this.duration = this.coursesService.getCourseDuration(this.course.duration);
    this.authors = this.course.authors.map((authorId: string) =>
      this.coursesService.getAuthorById(authorId)
    );*/
    this.creationDate = this.course.creationDate;
    this.duration = this.course.duration;
    this.authors = this.course.authors;
  }

  onShowCourse() {
    this.clickOnShow.emit(this.course.id);
  }
  onDeleteCourse() {
    this.clickOnDelete.emit(this.course.id);
  }
  onEditCourse() {
    this.clickOnEdit.emit(this.course.id);
  }
  /* title = this.course.title;
  description = this.course.description;
  authors = this.course.authors.join(", ");
  duration = this.course.duration;
  created = this.course.creationDate; */
}
