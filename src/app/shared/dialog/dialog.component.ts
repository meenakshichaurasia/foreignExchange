import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  addTradeLoading: boolean = false;
  addForm!: FormGroup;
  actionBtn: string = "Save"


  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editRecord: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    /**
      * Add trading data Form Definition
      */
    this.addForm = this.formbuilder.group({
      market: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      buyingPrice: ['', Validators.required]
    });

    if (this.editRecord) {
      this.actionBtn = "Update";
      this.addForm.controls['market'].setValue(this.editRecord.market);
      this.addForm.controls['sellingPrice'].setValue(this.editRecord.sellingPrice);
      this.addForm.controls['buyingPrice'].setValue(this.editRecord.buyingPrice);
    }

  }

  // Posting data
  addData() {
    this.addTradeLoading = true;
    if (this.addForm.invalid) {
      Object.keys(this.addForm.controls).forEach(key => {
        this.addForm.controls[key].markAsDirty();
      });
      this.addTradeLoading = false;
      return;
    }

    if (!this.editRecord) {
      if (this.addForm.valid) {
        this.api.postData(this.addForm.value).subscribe({
          next: (res) => {
            this.addTradeLoading = false;
            this.toastr.success('Trading data added successfully!', 'Hello there!');
            this.addForm.reset();
            if(Boolean(this.dialogRef.close)){
              this.dialogRef.close("save");
            }
          },
          error: (e) => {
            this.addTradeLoading = false;
            this.toastr.error('Unable to add data.');
          }
        })
      }
    }
    else {
      this.updateData();
    }
  }
  // Updating data
  updateData() {
    this.api.putData(this.addForm.value, this.editRecord._id)
      .subscribe({
        next: () => {
          this.addTradeLoading = false;
          this.toastr.success('Data record updated successfully!', 'Hello there!');
          this.addForm.reset();
          if(Boolean(this.dialogRef.close)){
            this.dialogRef.close("update");
          }
        },
        error: (e) => {
          this.addTradeLoading = false;
          this.toastr.error('Unable to update data.');
        }
      })
  }
}
