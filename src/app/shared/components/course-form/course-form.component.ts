import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";

import { v4 } from "uuid";

import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { mockedAuthorsList } from "@app/shared/mocks/mocks";
import { Author } from "@app/shared/models/author.model";
import { ButtonLabels } from "@app/shared/constants/button-labels";

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

  btnTextCreateCourse: string = ButtonLabels.createCourse;
  btnTextCancel: string = ButtonLabels.cancel;
  btnTextCreateAuthor: string = ButtonLabels.createAuthor;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  ngOnInit(): void {
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
    this.authorsList = [...mockedAuthorsList];
    this.authorsList.forEach((author) => {
      this.authorsListArray.push(this.fb.control(author));
    });
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
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
      this.authors.push(this.fb.control({ id: v4(), name: this.author.value }));
      this.newAuthor.reset();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      if (this.courseAuthors.value.length > 0) {
        this.courseForm.reset();
        this.courseAuthors.clear();
        this.authorsListArray.clear();
        this.initAuthorsList();
        this.authorsListError = false;
        this.submitted = false;
      } else {
        this.authorsListError = true;
      }
    }
  }
}
