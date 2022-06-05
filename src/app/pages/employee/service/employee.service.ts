import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from 'src/app/data/model/employee-model';
import { environment } from 'src/environments/environment';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeList(queryParams: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((k) => {
      if (queryParams[k]) {
        params = params.append(k, queryParams[k]);
      }
    });

    return this.http.get<EmployeeModel[]>(
      `${environment.baseUrl}employees`,
      {
        observe: 'response',
        params,
      }
    );
  }

  addEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(
      `${environment.baseUrl}employees`,
      employee
    );
  }
}
