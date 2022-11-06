import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html',
})
export class EditDialog {
  constructor(
    private dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private toastr: ToastrService
  ) {}
  newDate: Date = new Date();

  onConfirmClick(): void {
    const params = {
      Case: 6,
      IdConcurso: this.data.IdConcurso,
      FechaConcurso: this.newDate,
    };
    this.api.request(params, 'contest').subscribe(
      (res: any) => {
        this.toastr.success(res.body.Result);
      },
      (err) => {
        this.toastr.error(err.body.Result);
      }
    );
    this.dialogRef.close(true);
  }
}
