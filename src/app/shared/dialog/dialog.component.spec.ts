import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ApiService} from "../../services/api.service";
import {of, throwError} from "rxjs";
import {Market} from "@app/models/market";

const mockRecord: Market = {
  _id: 'qrqrrjasdf4',
  market: 'USD vs INR',
  sellingPrice: '70',
  buyingPrice: '80'
};


describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let api: ApiService;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [DialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    api = TestBed.inject(ApiService);
    toastr = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addData', ()=> {
    it('form invalid', ()=> {
      component.addTradeLoading = true;
      component.addData();
      expect(component.addForm.invalid).toBeTrue();
      expect(component.addTradeLoading).toBeFalse();
    })
    it('form valid: postData-success', ()=> {
      component.addTradeLoading = true;
      component.editRecord = null;
      component.addForm.patchValue({
        market: 'USD vs INR',
        sellingPrice: 120,
        buyingPrice: 200
      });
      spyOn(api, 'postData').and.callFake(() => {
        return of(mockRecord);
      });
      spyOn(toastr, 'success');

      component.addData();
      expect(toastr.success).toHaveBeenCalledWith('Trading data added successfully!', 'Hello there!');
      expect(component.addTradeLoading).toBeFalse();
    })
    it('postData: error', fakeAsync(()=> {
      const mockError = {
        status: 404,
        error: {
          message: 'Error'
        }
      };
      component.addTradeLoading = true;
      component.editRecord = null;
      component.addForm.patchValue({
        market: 'USD vs INR',
        sellingPrice: 120,
        buyingPrice: 200
      });
      spyOn(api, 'postData').and.returnValue(throwError(mockError));
      spyOn(toastr, 'error');

      component.addData();
      expect(toastr.error).toHaveBeenCalledWith('Unable to add data.');
    }));
    it('form valid: updateData-success', ()=> {
      component.addTradeLoading = true;
      component.editRecord = mockRecord;
      component.addForm.patchValue({
        market: 'USD vs INR',
        sellingPrice: 120,
        buyingPrice: 200
      });
      spyOn(api, 'putData').and.callFake(() => {
        return of(null);
      });
      spyOn(toastr, 'success');

      component.addData();
      expect(toastr.success).toHaveBeenCalledWith( 'Data record updated successfully!', 'Hello there!' );
      expect(component.addTradeLoading).toBeFalse();
    })
    it('updateData: error', fakeAsync(()=> {
      const mockError = {
        status: 404,
        error: {
          message: 'Error'
        }
      };
      component.addTradeLoading = true;
      component.editRecord = mockRecord;
      component.addForm.patchValue({
        market: 'USD vs INR',
        sellingPrice: 120,
        buyingPrice: 200
      });
      spyOn(api, 'putData').and.returnValue(throwError(mockError));
      spyOn(toastr, 'error');

      component.addData();
      expect(toastr.error).toHaveBeenCalledWith('Unable to update data.');
    }));
  })
});
