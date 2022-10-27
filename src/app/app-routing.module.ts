import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TradingComponent } from './components/trading/trading.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'signIn', pathMatch: 'full'
  },
  {
    path: 'signIn', component: SignInComponent
  },
  {
    path: 'trading', component: TradingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'pageNotFound', component: PageNotFoundComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
