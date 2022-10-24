import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  old: string;
  new: string;
}

@Component({
  selector: 'app-maint-category',
  templateUrl: './category-maintenance.component.html',
  styleUrls: ['./category-maintenance.component.css']
})
export class CategoryMaintenanceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoryMaintenanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

}
