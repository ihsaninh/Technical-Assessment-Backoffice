export class EmployeeListParamModel {
	public _page: number;
	public _limit: number;
	public username: string;
	public email: string;
	public _sort: string;

	constructor() {
		this._page = 1,
    this._limit = 15,
    this._sort = 'username'
	}
}
