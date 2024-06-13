import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  email: string = '';  // Holds the user's email address
  otp: string = '';  // Holds the OTP entered by the user
  message: string = '';  // Holds messages to display to the user
  isLoading: boolean = false;  // Indicates if an API call is in progress

  constructor(private otpService: OtpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  // Handles the submission of the OTP verification form
  onSubmit(): void {
    if (!this.otp) {
      this.message = 'Please enter the OTP';
      return;
    }

    this.isLoading = true; 
    this.message = '';  // Clear any previous messages
    this.otpService.verifyOtp(this.email, this.otp).subscribe(
      (response) => {
        this.message = response.message;
        this.isLoading = false; 
      },
      (error) => {
        this.message = error.error.message || 'An error occurred. Please try again.';
        this.isLoading = false; 
      }
    );
  }

  // Handles the click event of the Back button
  onBack(): void {
    this.message = ''; 
    this.router.navigate(['/generate-otp'], {
      queryParams: { email: this.email }
    });
  }
}
