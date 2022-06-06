import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeListParamModel } from '../../shared/model/employee-list-param-model';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.scss'],
})
export class EmployeeFilterComponent implements OnInit {
  public filterForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeFilterComponent>
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initFormFilter();
  }

  initFormFilter() {
    this.filterForm = new FormGroup({
      q: new FormControl(this.data.q || ''),
      basicSalary_gte: new FormControl(this.data.basicSalary_gte || ''),
      basicSalary_lte: new FormControl(this.data.basicSalary_lte || ''),
    });
  }

  resetFilter() {
    this.filterForm.reset();
  }

  applyFilter() {
    this.dialogRef.close(this.filterForm.value);
  }
}
