import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeModel } from 'src/app/data/model/employee-model';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  private subscribers: Subscription[] = [];
  private id: string | null;

  public isLoading: boolean = false;
  public employee: EmployeeModel;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEmployeeDetail();
  }

  getEmployeeDetail() {
    this.isLoading = true;

    const subs = this.service.getEmployeeById(this.id).subscribe((resp) => {
      this.employee = resp;
      this.isLoading = false;
    });

    this.subscribers.push(subs);
  }

  navigateBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((sub) => sub.unsubscribe());
  }
}
