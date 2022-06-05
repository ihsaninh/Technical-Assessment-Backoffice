import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { TableModel } from 'src/app/core/table/table-model';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeListParamModel } from '../../shared/model/employee-list-param-model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  private subscribers: Subscription[] = [];
  private paramModel: EmployeeListParamModel;

  public isLoading: boolean;
  public table: TableModel;

  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.paramModel = new EmployeeListParamModel();

    this.getDataEmployee();
    this.initTable();
  }

  private initTable() {
    this.table = new TableModel();
    this.table.labels = [
      'Username',
      'First Name',
      'Last Name',
      'Email',
      'Birth Date',
      'Basic Salary',
      'Status',
      'Group',
      'Description',
      'Action',
    ];
    this.table.columns = [
      'username',
      'firstName',
      'lastName',
      'email',
      'birthDate',
      'basicSalary',
      'status',
      'group',
      'description',
      'action',
    ];
  }

  private getDataEmployee() {
    this.isLoading = true;

    const subs = this.service
      .getEmployeeList(this.paramModel)
      .subscribe((resp) => {
        this.table.totalData = resp.headers.get('X-Total-Count');
        this.table.dataSource.data = resp.body;

        this.isLoading = false;
      });

    this.subscribers.push(subs);
  }

  public updatePage($event: PageEvent) {
    this.table.setPageSize($event.pageSize);
    this.table.setPage($event.pageIndex + 1);

    this.paramModel._page = this.table.page;
    this.paramModel._limit = this.table.pageSize;

    this.getDataEmployee();
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((each) => each.unsubscribe());
  }
}
