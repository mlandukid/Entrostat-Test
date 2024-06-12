import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Sends a POST request to generate an OTP for the given email
  generateOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/otp/generate`, { email });
  }

  // Sends a POST request to verify the OTP for the given email
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/otp/verify`, { email, otp });
  }
}
