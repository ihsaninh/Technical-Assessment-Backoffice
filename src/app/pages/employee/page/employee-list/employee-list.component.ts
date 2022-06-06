import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private service: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

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

  onSortTable($event: any) {
    this.paramModel._sort = $event.sort;
    this.paramModel._order = $event.direction;
    this.paramModel._page = 1;

    this.getDataEmployee();
  }

  onDeleteEmployee(id: number) {
    const subs = this.service.deleteEmployee(id).subscribe((resp) => {
      this.snackBar.open('Delete employee success', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'success-snackbar',
      });
      this.getDataEmployee();
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
