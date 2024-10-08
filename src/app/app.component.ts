import { Component } from "@angular/core";

import { mockedCoursesList } from "./shared/mocks/mocks";
import { ButtonLabels } from "./shared/constants/button-labels";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  //  text for buttons
  btnTextLogin: string = ButtonLabels.login;
  btnTextLogout: string = ButtonLabels.logout;
  btnTextAddNewCourse: string = ButtonLabels.addNewCourse;

  // info page text
  infoTitle = "Your List Is Empty";
  infoText = "Please use 'Add New Course' button to add your first course";

  // Mocked Course
  mockedCourse = mockedCoursesList[0];
  mockedCoursesList = mockedCoursesList;
  showCourse(courseId: string) {
    console.log("Clicked on Show Course with ID:", courseId);
  }
  deleteCourse(courseId: string) {
    console.log("Clicked on Delete Course with ID:", courseId);
  }
  editCourse(courseId: string) {
    console.log("Clicked on Edit Course with ID:", courseId);
  }
}
