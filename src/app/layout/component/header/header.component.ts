import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/pages/employee/component/confirmation-modal/confirmation-modal.component';
import { ConfirmationModel } from 'src/app/pages/employee/shared/model/confirmation-modal-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  public isDesktop: boolean;

  @Output()
  public sidenavToggle: EventEmitter<void>;

  constructor(private router: Router, private dialog: MatDialog) {
    this.sidenavToggle = new EventEmitter();
  }
  ngOnInit(): void {}

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public onLogout() {
    const confirmation = new ConfirmationModel();
    confirmation.title = 'Are you sure to logout?';
    confirmation.btnSubmit = 'Yes';
    confirmation.btnCancel = 'No';

    this.dialog
      .open(ConfirmationModalComponent, {
				width: '400px',
        autoFocus: false,
        data: {
          confirmation,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          localStorage.removeItem('userData.username');
          this.router.navigate(['/auth']);
        }
      });
  }
}
