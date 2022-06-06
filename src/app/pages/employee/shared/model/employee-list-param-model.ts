export class EmployeeListParamModel {
  public username: string;
  public q: string;
  public basicSalary_gte: string;
  public basicSalary_lte: string;
  public _page: number;
  public _limit: number;
  public email: string;
  public _sort: string;
  public _order: string;

  constructor() {
    this._page = 1;
    this._limit = 15;
  }
}
