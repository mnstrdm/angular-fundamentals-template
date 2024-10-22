import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  searchTerm: string = "";
  btnTextSearch: string = ButtonLabels.search;
  btnTextAddNewCourse: string = ButtonLabels.addNewCourse;
  isAdmin!: boolean;
  @Input() placeholder: string = "Input text";
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private userStoreService: UserStoreService,
    private courseStoreService: CoursesStoreService
  ) {}

  ngOnInit() {
    this.isAdmin = this.userStoreService.isAdmin;
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onAddNewCourse() {
    this.courseStoreService.getAllAuthors();
    this.router.navigate(["/courses/add"]);
  }
}
