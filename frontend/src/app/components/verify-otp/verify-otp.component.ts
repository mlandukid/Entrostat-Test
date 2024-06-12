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

  constructor(private otpService: OtpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  // Handles the submission of the OTP verification form
  onSubmit(): void {
    this.message = ''; 
    this.otpService.verifyOtp(this.email, this.otp).subscribe(
      (response) => {
        this.message = response.message;
      },
      (error) => {
        this.message = error.error.message;
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
