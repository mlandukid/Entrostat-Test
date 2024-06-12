import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateOtpComponent } from './components/generate-otp/generate-otp.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';

const routes: Routes = [
  { path: '', redirectTo: '/generate-otp', pathMatch: 'full' },
  { path: 'generate-otp', component: GenerateOtpComponent },
  { path: 'verify-otp', component: VerifyOtpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
