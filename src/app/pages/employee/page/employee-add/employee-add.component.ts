import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent implements OnInit, OnDestroy {
  private subscribers: Subscription[] = [];
  public isLoading: boolean = false;
  public id: string | null;
  public employeeForm: FormGroup = new FormGroup({});
  public maxDate = new Date();
  public groups = [
    'admin',
    'user',
    'guest',
    'superadmin',
    'group1',
    'group2',
    'group3',
    'group4',
    'group5',
  ];
  filteredGroups: Observable<string[]>;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initFormEmployee();

    if (this.id) {
      this.initEdit();
    }

    this.filteredGroups = this.employeeForm.get('group')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groups.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  initFormEmployee() {
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$'
        ),
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  private initEdit() {
    const subs = this.service.getEmployeeById(this.id).subscribe((res) => {
      this.employeeForm.patchValue({
        username: res.username,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        birthDate: res.birthDate,
        basicSalary: res.basicSalary,
        status: res.status,
        group: res.group,
        description: res.description,
      });
    });

    this.subscribers.push(subs);
  }

  onAddEmployee() {
    const payload = this.employeeForm.value;

    if (!!this.id) {
      const subs = this.service.editEmployee(this.id, payload).subscribe(() => {
        this.employeeForm.reset();
        this.router.navigate(['/dashboard/employee']);
        this.openSnackbarSuccess('Edit employee success');
      });

      this.subscribers.push(subs);
    } else {
      const subs = this.service.addEmployee(payload).subscribe(() => {
        this.employeeForm.reset();
        this.router.navigate(['/dashboard/employee']);
        this.openSnackbarSuccess('Add employee success');
      });

      this.subscribers.push(subs);
    }
  }

  openSnackbarSuccess(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'success-snackbar',
    });
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((sub) => sub.unsubscribe());
  }
}
