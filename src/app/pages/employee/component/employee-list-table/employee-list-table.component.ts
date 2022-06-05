import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { TableModel } from 'src/app/core/table/table-model';

@Component({
  selector: 'app-employee-list-table',
  templateUrl: './employee-list-table.component.html',
  styleUrls: ['./employee-list-table.component.scss']
})
export class EmployeeListTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  
  @Input()
	public table: TableModel;

  constructor() { }

  ngAfterViewInit() {
    this.table.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

}
