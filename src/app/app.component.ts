import { Component } from "@angular/core";
import {
  faPencil,
  IconDefinition,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { mockedCoursesList } from "./shared/mocks/mocks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  //  text for buttons
  btnTextLogin: string = "Login";
  btnTextLogout: string = "Logout";
  btnTextAddNewCourse: string = "Add New Course";
  btnTextShowCourse: string = "Show Course";

  // icons for buttons
  faTrashCan: IconDefinition = faTrashCan;
  faPencil: IconDefinition = faPencil;

  // info page text
  infoTitle = "Your List Is Empty";
  infoText = "Please use 'Add New Course' button to add your first course";

  // Mocked Course
  mockedCourse = mockedCoursesList[0];
  showCourse(coursId: string) {}
}
