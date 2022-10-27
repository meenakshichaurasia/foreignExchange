import {fakeAsync, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import {Market} from "@app/models/market";

const mockRecord: Market = {
  _id: 'qrqrrjasdf4',
  market: 'USD vs INR',
  sellingPrice: '70',
  buyingPrice: '80'
};


describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`Fetch postData as an Observable`, fakeAsync(() => {
    service.postData({}).subscribe((res) => {
      expect(res).toEqual(mockRecord);
    });
  }));

  it(`Fetch getData as an Observable`, fakeAsync(() => {
    service.getData().subscribe((res) => {
      expect(res).toEqual([mockRecord, mockRecord]);
    });
  }));

  it(`Fetch putData as an Observable`, fakeAsync(() => {
    service.putData({}, 1).subscribe((res) => {
      expect(res).toEqual(null);
    });
  }));

  it(`Fetch deleteData as an Observable`, fakeAsync(() => {
    service.deleteData( 1).subscribe((res) => {
      expect(res).toEqual(null);
    });
  }));

});
