import { fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TradingComponent } from './components/trading/trading.component';

describe('AppComponent', () => {

  // let location: Location;
  // let router: Router;
  // let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        SignInComponent,
        TradingComponent,
        PageNotFoundComponent,
        AppComponent,
      ],
    }).compileComponents();
  });

  // router = TestBed.get(Router);
  // location = TestBed.get(Location);
  // fixture = TestBed.createComponent(AppComponent);
  // router.initialNavigation();

  // it('navigate to "" redirects you to /signIn', fakeAsync(() => {
  //   router.navigate(['']);
  //   tick();
  //   expect(location.path()).toBe('/signIn');
  // }));

  // it('navigate to "signIn" redirects you to /signIn', fakeAsync(() => {
  //   router.navigate(['']);
  //   tick();
  //   expect(location.path()).toBe('/signIn');
  // }));

  // it('navigate to "trading" redirects you to /trading', fakeAsync(() => {
  //   router.navigate(['']);
  //   tick();
  //   expect(location.path(trading)).toBe('/trading');
  // }));

  // it('navigate to "**" redirects you to /pageNotFound', fakeAsync(() => {
  //   router.navigate(['']);
  //   tick();
  //   expect(location.path()).toBe('/pageNotFound');
  // }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'foreignExchange'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('foreignExchange');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('foreignExchange app is running!');
  // });

});
