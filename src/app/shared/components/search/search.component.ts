import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonLabels } from "@app/shared/constants/button-labels";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  searchTerm: string = "";
  btnTextSearch: string = ButtonLabels.search;
  btnTextAddNewCourse: string = ButtonLabels.addNewCourse;

  constructor(private router: Router) {}

  @Input() placeholder: string = "Input text";
  @Output() search: EventEmitter<string> = new EventEmitter();

  onSearch() {
    console.log(this.searchTerm);
    this.search.emit(this.searchTerm);
  }

  onAddNewCourse() {
    this.router.navigate(["/courses/add"]);
  }
}
