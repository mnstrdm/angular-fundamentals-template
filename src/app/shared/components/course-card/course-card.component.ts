import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import {
  IconDefinition,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Course } from "@app/shared/models/course.model";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { Observable, Subscription, filter, map, switchMap, take } from "rxjs";
import { AuthorsStateFacade } from "@app/store/author/authors.facade";
import { UserStateFacade } from "@app/store/user/user.facade";
@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent implements OnInit, OnDestroy {
  @Input() isEditabel!: boolean;
  @Input() course!: Course;

  @Output() clickOnShow: EventEmitter<string> = new EventEmitter();
  @Output() clickOnDelete: EventEmitter<string> = new EventEmitter();
  @Output() clickOnEdit: EventEmitter<string> = new EventEmitter();

  constructor(
    private userStateFacade: UserStateFacade,
    private authorsStateFacade: AuthorsStateFacade
  ) {}

  btnTextShowCourse: string = ButtonLabels.showCourse;
  isAdmin$: Observable<boolean> = this.userStateFacade.isAdmin$;
  authorsByName: string[] = [];
  private subscriptions: Subscription[] = [];

  // icons for buttons
  faTrashCan: IconDefinition = faTrashCan;
  faPencil: IconDefinition = faPencil;

  ngOnInit() {
    const subscribeAuthorsByName = this.authorsStateFacade.isAllAuthorLoading$
      .pipe(
        filter((isLoading) => !isLoading),
        take(1),
        switchMap(() =>
          this.authorsStateFacade
            .getAuthorsById(this.course.authors)
            .pipe(map((authors) => authors.map((author) => author.name)))
        )
      )
      .subscribe((authorsName) => {
        this.authorsByName = authorsName;
      });

    this.subscriptions.push(subscribeAuthorsByName);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscrition) => {
      subscrition.unsubscribe();
    });
  }
}
