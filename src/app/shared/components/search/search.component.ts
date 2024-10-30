import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { UserStateFacade } from "@app/store/user/user.facade";
import { Observable } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchTerm: string = "";
  btnTextSearch: string = ButtonLabels.search;
  btnTextAddNewCourse: string = ButtonLabels.addNewCourse;
  isAdmin$: Observable<boolean> = this.userStateFacade.isAdmin$;
  @Input() placeholder: string = "Input text";
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private userStateFacade: UserStateFacade
  ) {}

  ngOnInit(): void {
    this.userStateFacade.getUser();
  }
  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onAddNewCourse() {
    this.router.navigate(["/courses/add"]);
  }
}
