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
import { UserStoreService } from "@app/user/services/user-store.service";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Subscription, forkJoin } from "rxjs";
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
    private userStoreService: UserStoreService,
    private courseStoreService: CoursesStoreService
  ) {}

  btnTextShowCourse: string = ButtonLabels.showCourse;
  isAdmin!: boolean;
  authorsByName: String[] = [];
  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.isAdmin = this.userStoreService.isAdmin;
    /* this.userStoreService.loggedInUser$.subscribe(
      (user) => (this.isAdmin = user.role === "admin" ? true : false)
    ); */
    /* this.userStoreService.isAdmin$.subscribe(
      (isadmin) => (this.isAdmin = isadmin)
    ); */
    this.createAuthorsNameList(this.course.authors);
  }

  // icons for buttons
  faTrashCan: IconDefinition = faTrashCan;
  faPencil: IconDefinition = faPencil;

  createAuthorsNameList(authorsIdList: string[]): void {
    const authorsObservables = authorsIdList.map((id) =>
      this.courseStoreService.getAuthorById(id)
    );

    const sub = forkJoin(authorsObservables).subscribe(
      (authors) =>
        (this.authorsByName = authors.map((author) => author.result.name))
    );

    this.subscriptions.add(sub);
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
    this.subscriptions.unsubscribe();
  }
}
