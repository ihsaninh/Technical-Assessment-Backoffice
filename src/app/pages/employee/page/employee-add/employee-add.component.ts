import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent implements OnInit {
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

  constructor(private service: EmployeeService) {}

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
      console.log(res)
    });
    this.subscribers.push(subs);
  }
}
