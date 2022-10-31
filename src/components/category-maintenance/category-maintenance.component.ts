import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  old: string;
  new: string;
}
/**
 * Dialog to prompt for new Category
 *
 * @export
 * @class CategoryMaintenanceComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-maint-category',
  templateUrl: './category-maintenance.component.html',
  styleUrls: ['./category-maintenance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryMaintenanceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoryMaintenanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  /**
   * closes the dialog
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }

}
