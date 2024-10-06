import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  searchTerm: string = "";

  @Input() placeholder: string = "Input text";
  @Output() search: EventEmitter<string> = new EventEmitter();

  onSearch() {
    console.log(this.searchTerm);
    this.search.emit(this.searchTerm);
  }
}
