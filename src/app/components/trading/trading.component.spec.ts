import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { TradingComponent } from './trading.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {ApiService} from "../../services/api.service";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder} from "@angular/forms";
import {of, throwError} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {Market} from "@app/models/market";

const mockRecord = {
  _id: 'ff53131313',
  market: 'USD vs INR',
  sellingPrice: '70',
  buyingPrice: '80'
};

describe('TradingComponent', () => {
  let component: TradingComponent;
  let fixture: ComponentFixture<TradingComponent>;
  let toastr: ToastrService;
  let api: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [TradingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    toastr = TestBed.inject(ToastrService);
    api = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openDialog call', () => {
    component.openDialog();
    expect(component.openDialog).toBeTruthy();
  });

  it('should editData call', () => {
    component.editData(1);
    expect(component.editData).toBeTruthy();
  });

  it('should logOut call', () => {
    spyOn(localStorage, 'removeItem');

    component.logOut();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  describe('getAllData', ()=> {
    it('getData: success', fakeAsync(()=> {
      const mockResponse: Market[] = [mockRecord, {...mockRecord, market: 'INR vs USD'}];
      spyOn(api, 'getData').and.callFake(() => {
        return of(mockResponse);
      });

      component.getAllData();
      expect(component.getAllData).toBeTruthy();
    }));
    it('getData: error', fakeAsync(()=> {
      const mockError = {
        status: 404,
        error: {
          message: 'Error'
        }
      };
      spyOn(api, 'getData').and.returnValue(throwError(mockError));
      spyOn(toastr, 'error');

      component.getAllData();
      expect(toastr.error).toHaveBeenCalledWith('Unable to fetch data.');
    }));
  });

  describe('deleteRecord', ()=> {
    it('deleteRecord: success',()=> {
      spyOn(component, 'getAllData');
      spyOn(api, 'deleteData').and.callFake(() => {
        return of(null);
      });

      component.deleteRecord(1);
      expect(component.getAllData).toHaveBeenCalled();
    });
    it('deleteRecord: error', fakeAsync(()=> {
      const mockError = {
        status: 404,
        error: {
          message: 'Error'
        }
      };
      spyOn(api, 'deleteData').and.returnValue(throwError(mockError));
      spyOn(toastr, 'error');

      component.deleteRecord(1);
      expect(toastr.error).toHaveBeenCalledWith('Unable to delete data.');
    }));
  });

});
