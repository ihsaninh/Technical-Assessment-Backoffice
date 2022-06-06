import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationModel } from '../../shared/model/confirmation-modal-model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  public confirmation: ConfirmationModel;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      confirmation: ConfirmationModel;
    },
    private dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {}

  ngOnInit() {
    this.confirmation = this.data.confirmation;
  }

  public onClose(status: boolean) {
    this.dialogRef.close(status);
  }
}
