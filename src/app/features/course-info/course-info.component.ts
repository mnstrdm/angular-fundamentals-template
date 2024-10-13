import { Component, EventEmitter, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { Location } from "@angular/common";

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}
@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course!: Course | undefined;
  btnTextBack: string = ButtonLabels.back;
  courseId: string | null = null;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get("id");
    this.course = mockedCoursesList.find(
      (course) => course.id === this.courseId
    );
  }

  onBack() {
    this.location.back();
  }
}
