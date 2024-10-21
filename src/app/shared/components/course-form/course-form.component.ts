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
import { Course } from "@app/shared/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";

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
  newCourse!: Course;

  //--- Edit course
  isEditPage: boolean = false;
  urlParam: string | null = null;
  editableCourse!: Course;

  //--- Button Labels
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
    this.courseStoreService.getAllAuthors();

    //--- get editable course data
    this.urlParam = this.route.snapshot.paramMap.get("id");
    if (this.urlParam) {
      this.isEditPage = true;
      this.loadCourseData(this.urlParam);
    }

    //--- Init authors list

    this.courseStoreService.authors$.subscribe((authors) => {
      this.authorsListArray = this.courseForm.get("authors") as FormArray;
      this.authorsListArray.clear();
      //--- If we edit our course do not show authors in author list, who are inculded in course authors
      if (this.editableCourse.authors.length > 0) {
        authors
          .filter((author) => !this.editableCourse.authors.includes(author.id))
          .forEach((author) =>
            this.authorsListArray.push(this.fb.control(author))
          );
      } else {
        authors.forEach((author) =>
          this.authorsListArray.push(this.fb.control(author))
        );
      }
    });

    //--- Init course authors
    this.courseAuthorsListArray = this.courseForm.get(
      "courseAuthors"
    ) as FormArray;

    this.courseAuthorsList.forEach((author) => {
      this.courseAuthorsListArray.push(this.fb.control(author));
    });

    this.submitted = false;
  }

  loadCourseData(id: string) {
    this.courseStoreService.getCourse(id).subscribe((respons) => {
      this.editableCourse = respons.result;
      this.setFormValues(this.editableCourse);
      //console.log("Editable course: ", this.editableCourse);
    });
  }
  //----- fill course form with course data we would like to edit
  setFormValues(editedCourse: Course): void {
    this.courseForm.patchValue({
      title: editedCourse.title,
      description: editedCourse.description,
      duration: editedCourse.duration,
    });
    editedCourse.authors?.forEach((author: string) => {
      let authorById!: Author;
      this.courseStoreService.getAuthorById(author).subscribe((authorObj) => {
        authorById = authorObj.result;
        //console.log("Author from seFormValues: ", author);
        //console.log("AuthorObj from seFormValues: ", authorById);
        this.courseAuthors.push(this.fb.control(authorById));
      });
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
    const authorToMove = this.authors.at(index).value;
    this.authors.removeAt(index);
    this.courseAuthors.push(this.fb.control(authorToMove));
    //console.log("Course authors array", this.courseAuthors);

    if (this.courseAuthors.value.length > 0) {
      this.authorsListError = false;
    }
  }
  deleteAuthor(index: number): void {
    const authorToMove = this.courseAuthors.at(index).value;
    this.courseAuthors.removeAt(index);
    this.authors.push(this.fb.control(authorToMove));
    //console.log("Course authors array", this.courseAuthors);
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
        this.newCourse = {
          title: this.title.value,
          description: this.description.value,

          duration: this.duration.value,
          authors: this.courseAuthors.value.map((auth: Author) => auth.id),
        };

        this.isEditPage ? this.editCourse() : this.createCourse();

        this.courseForm.reset();
        this.courseAuthors.clear();
        this.authorsListArray.clear();
        //this.initAuthorsList();
        this.authorsListError = false;
        this.submitted = false;
        this.router.navigate(["/courses"]);
      } else {
        this.authorsListError = true;
      }
    }
  }

  editCourse() {
    this.courseStoreService.editCourse(this.urlParam!, this.newCourse);
  }
  createCourse() {
    this.courseStoreService.createCourse(this.newCourse);
  }

  onCancel() {
    this.location.back();
  }
}
