import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { Packlist } from '../../models/packlist';


@Component({
  selector: 'app-packlist-open-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packlist-open-dialog.component.html',
})
export class PacklistOpenDialogComponent {
  dialogRef = inject(DialogRef<Packlist | null>);
  packlists = inject(DIALOG_DATA) as Packlist[];

  select(list: Packlist) {
    this.dialogRef.close(list);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
