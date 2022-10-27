import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {
  tableLoading: boolean = true;
  displayedColumns: string[] = ['market', 'sellingPrice', 'buyingPrice', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllData();
      }
    })
  }

  //get call
  getAllData() {
    this.api.getData()
      .subscribe({
        next: (res) => {
          this.tableLoading = false;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },error: (e) => {
          this.tableLoading = false;
          this.toastr.error("Unable to fetch data.");
        }
      })
  }

  editData(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllData();
      }
    })
  }

  deleteRecord(_id: any) {
    this.api.deleteData(_id).subscribe({
      next: () => {
        this.toastr.success('data deleted successfully', 'Hello there!');
        this.getAllData();
      },
      error: (e) => {
        this.toastr.error('Unable to delete data.');
      }
    })
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signIn']);
  }


}
