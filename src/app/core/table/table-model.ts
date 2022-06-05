import { MatTableDataSource } from '@angular/material/table';

export class TableModel<T = any> {
	public columns: string[];
	public dataSource: MatTableDataSource<T>;
	public labels: string[];
	public page: number;
	public pageSize: number;
	public totalData: number;

	constructor() {
		this.columns = [];
		this.dataSource = new MatTableDataSource<T>([]);
		this.labels = [];
		this.page = 1;
		this.pageSize = 15;
		this.totalData = 0;
	}

	public getNumber(index: number): string {
		let next = index + 1;

		if (this.page > 1) {
			next = this.pageSize * (this.page - 1) + (index + 1);
		}

		return next.toString();
	}

	public getPageIndex(): number {
		return this.page - 1;
	}

	public isEmpty(): boolean {
		return this.totalData === 0;
	}

	public setPage(page: number) {
		this.page = page;
	}

	public setPageSize(size: number) {
		this.pageSize = size;
	}

	public resetPage() {
		this.page = 1;
	}
}
