import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { TableModel } from 'src/app/core/table/table-model';
import { ConfirmationModel } from '../../shared/model/confirmation-modal-model';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-employee-list-table',
  templateUrl: './employee-list-table.component.html',
  styleUrls: ['./employee-list-table.component.scss'],
})
export class EmployeeListTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  public table: TableModel;

  @Output()
  public deleteEmployee = new EventEmitter<number>();

  @Output()
  public sortTable = new EventEmitter<any>();

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.sortTable.emit({
        sort: this.sort.active,
        direction: this.sort.direction,
      });
    });
  }

  ngOnInit(): void {}

  onDeleteEmployee(id: number) {
    const confirmation = new ConfirmationModel();
    confirmation.content = 'Are you sure to delete this data?';
    confirmation.btnSubmit = 'Yes';
    confirmation.btnCancel = 'No';

    this.dialog
      .open(ConfirmationModalComponent, {
        autoFocus: false,
        data: {
          confirmation,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deleteEmployee.emit(id);
        }
      });
  }
}
