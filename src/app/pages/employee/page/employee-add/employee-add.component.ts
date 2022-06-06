import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent implements OnInit, OnDestroy {
  private subscribers: Subscription[] = [];
  public isLoading: boolean = false;
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

  constructor(
    private service: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initFormEmployee();
  }

  initFormEmployee() {
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
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

  onAddEmployee() {
    const payload = this.employeeForm.value;
    const subs = this.service.addEmployee(payload).subscribe((res) => {
      this.employeeForm.reset();
      this.router.navigate(['/dashboard/employee']);
      this.openSnackbarSuccess()
    });

    this.subscribers.push(subs);
  }

  openSnackbarSuccess() {
    this.snackBar.open('Add employee success', '', {
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
