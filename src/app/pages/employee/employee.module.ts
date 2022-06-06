import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { EmployeeListComponent } from './page/employee-list/employee-list.component';
import { EmployeeService } from './service/employee.service';
import { EmployeeListTableComponent } from './component/employee-list-table/employee-list-table.component';
import { RupiahPipe } from 'src/app/ui/pipes/rupiah/rupiah.pipe';
import { ConfirmationModalComponent } from './component/confirmation-modal/confirmation-modal.component';
import { EmployeeAddComponent } from './page/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { EmployeeFilterComponent } from './component/employee-filter/employee-filter.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeListTableComponent,
    RupiahPipe,
    EmployeeAddComponent,
    EmployeeDetailComponent,
    ConfirmationModalComponent,
    EmployeeFilterComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    DigitOnlyModule,
    MatSnackBarModule,
  ],
  providers: [
    EmployeeService
  ],
})
export class EmployeeModule {}
