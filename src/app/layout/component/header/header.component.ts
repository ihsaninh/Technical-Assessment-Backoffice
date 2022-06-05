import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
	public isDesktop: boolean;

	@Output()
	public sidenavToggle: EventEmitter<void>;

	constructor(private router: Router) {
		this.sidenavToggle = new EventEmitter();
	}
  ngOnInit(): void {
      
  }

  public onToggleSidenav() {
		this.sidenavToggle.emit();
	}

}
