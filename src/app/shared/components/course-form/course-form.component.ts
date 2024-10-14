import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";

import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Author } from "@app/shared/models/author.model";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Course, newCourse } from "@app/shared/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  authorsList: Author[] = [];
  courseAuthorsList: string[] = [];
  submitted!: boolean;
  authorsListError!: boolean;
  authorsListArray!: FormArray;
  courseAuthorsListArray!: FormArray;
  newCourse!: newCourse;
  editableCourse!: Course;

  isEditPage: boolean = false;
  urlParam: string | null = null;

  btnTextCreateCourse: string = ButtonLabels.createCourse;
  btnTextCancel: string = ButtonLabels.cancel;
  btnTextCreateAuthor: string = ButtonLabels.createAuthor;
  btnTextEditCourse: string = ButtonLabels.editCourse;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private courseStoreService: CoursesStoreService
  ) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  ngOnInit(): void {
    // get editable course data
    this.urlParam = this.route.snapshot.paramMap.get("id");
    if (this.urlParam) {
      this.isEditPage = true;
      this.getEditedCourse(this.urlParam);
    }

    this.courseStoreService.getAllAuthors();
    this.authorsListArray = this.courseForm.get("authors") as FormArray;
    this.courseAuthorsListArray = this.courseForm.get(
      "courseAuthors"
    ) as FormArray;
    this.initAuthorsList();
    this.courseAuthorsList.forEach((author) => {
      this.courseAuthorsListArray.push(this.fb.control(author));
    });

    this.submitted = false;
  }

  initAuthorsList() {
    this.courseStoreService.authors$.subscribe((authors) => {
      this.authorsList = authors;
    });
    //this.authorsList = [...mockedAuthorsList];
    this.authorsList.forEach((author) => {
      this.authorsListArray.push(this.fb.control(author));
    });
  }

  getEditedCourse(id: string) {
    this.courseStoreService.getCourse(id).subscribe((respons) => {
      this.editableCourse = {
        id: respons.result.id,
        title: respons.result.id,
        description: respons.result.description,
        duration: respons.result.duration,
        creationDate: respons.result.creationDate,
        authors: [...respons.result.authors],
      };
    });
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: ["", [Validators.required, Validators.min(0)]],
      newAuthor: this.fb.group({
        author: [
          "",
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9\s]*$/)],
        ],
      }),
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
    });
  }

  get title(): FormControl {
    return this.courseForm.get("title") as FormControl;
  }
  get description(): FormControl {
    return this.courseForm.get("description") as FormControl;
  }
  get duration(): FormControl {
    return this.courseForm.get("duration") as FormControl;
  }

  get newAuthor(): FormGroup {
    return this.courseForm.get("newAuthor") as FormGroup;
  }
  get author(): FormControl {
    return this.newAuthor.get("author") as FormControl;
  }

  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get("courseAuthors") as FormArray;
  }

  addAuthor(index: number): void {
    this.courseAuthors.push(this.fb.control(this.authors.value[index]));
    this.authors.removeAt(index);
    if (this.courseAuthors.value.length > 0) {
      this.authorsListError = false;
    }
  }
  deleteAuthor(index: number): void {
    this.authors.push(this.fb.control(this.courseAuthors.value[index]));
    this.courseAuthors.removeAt(index);
  }

  addNewAuthor(): void {
    if (this.newAuthor.valid && this.newAuthor.value.author.length > 0) {
      this.courseStoreService.createAuthor(this.author.value);

      this.newAuthor.reset();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      if (this.courseAuthors.value.length > 0) {
        if (this.isEditPage) {
          // if course is edited
        } else {
          // if new course is created
          this.newCourse = {
            title: this.title.value,
            description: this.description.value,
            duration: this.duration.value,
            authors: this.courseAuthors.value.map((auth: Author) => auth.id),
          };
          console.log("Authors: ", this.authors.value);
          console.log(
            "Authors id array: ",
            this.authors.value.map((auth: Author) => auth.id)
          );
          console.log("New Course: ", this.newCourse);
          this.courseStoreService.createCourse(this.newCourse);

          this.courseForm.reset();
          this.courseAuthors.clear();
          this.authorsListArray.clear();
          this.initAuthorsList();
          this.authorsListError = false;
          this.submitted = false;
          this.router.navigate(["/courses"]);
        }
      } else {
        this.authorsListError = true;
      }
    }
  }

  onEdit() {}

  onCancel() {
    this.location.back();
  }
}
