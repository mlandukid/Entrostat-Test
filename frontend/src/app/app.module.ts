import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerateOtpComponent } from './components/generate-otp/generate-otp.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerateOtpComponent,
    VerifyOtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
