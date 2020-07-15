import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  id: number;
  title : string;
  subtitle : string;
  btn_titre : String ;
}

@Component({
  templateUrl: './diglog-suppression.component.html',
  styleUrls: ['./diglog-suppression.component.scss']
})
export class DiglogSuppressionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DiglogSuppressionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
