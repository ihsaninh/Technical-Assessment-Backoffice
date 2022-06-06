import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './page/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './page/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    data: { shouldDetach: true },
  },
  {
    path: 'add',
    component: EmployeeAddComponent,
  },
  {
    path: 'edit/:id',
    component: EmployeeAddComponent,
  },
  {
    path: ':id',
    component: EmployeeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
