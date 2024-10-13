import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonLabels } from "@app/shared/constants/button-labels";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent {
  @Input() title!: string;
  @Input() text?: string;
  btnTextAddNewCourse: string = ButtonLabels.addNewCourse;

  constructor(private route: Router) {}

  onAddNewCourse() {
    this.route.navigate(["/courses/add"]);
  }
}
