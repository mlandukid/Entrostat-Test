import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrls: ['./generate-otp.component.scss']
})
export class GenerateOtpComponent implements OnInit {
  email: string = '';  // Holds the user's email address
  message: string = '';  // Holds messages to display to the user
  quote: string = '';  // Holds a randomly selected Star Wars quote
  isLoading: boolean = false;  // Indicates if an API call is in progress

  constructor(private otpService: OtpService, private router: Router) { }

  ngOnInit(): void {
    this.displayQuote();
  }

  // Handles the submission of the OTP generation form
  onSubmit(): void {
    if (!this.email) {
      this.message = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true; 
    this.message = '';  // Clear any previous messages
    this.otpService.generateOtp(this.email).subscribe(
      (response) => {
        this.message = response.message;
        this.isLoading = false;  
        this.router.navigate(['/verify-otp'], {
          queryParams: { email: this.email }
        });
      },
      (error) => {
        // Display error message if OTP generation fails
        this.message = error.error.message || 'An error occurred. Please try again.';
        this.isLoading = false;  // Hide loading indicator
      }
    );
  }

  // Handles the click event of the Resend OTP button
  onResend(): void {
    if (!this.email) {
      this.message = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;  // Show loading indicator
    this.message = '';  // Clear any previous messages
    this.otpService.generateOtp(this.email).subscribe(
      (response) => {
        this.message = response.message;
        this.isLoading = false;
        this.router.navigate(['/verify-otp'], {
          queryParams: { email: this.email }
        });
      },
      (error) => {
        this.message = error.error.message || 'An error occurred. Please try again.';
        this.isLoading = false; 
      }
    );
  }

  // Randomly select and display a Star Wars quote
  displayQuote(): void {
    const quotes = [
      { character: "Luke Skywalker", quote: "I am a Jedi, like my father before me, oh and he always provided OTPs." },
      { character: "Darth Vader", quote: "I find your lack of faith and OTP disturbing." },
      { character: "Yoda", quote: "Do, or do not. There is no try. OTP needed." },
      { character: "Obi-Wan Kenobi", quote: "The Force will be with you, and a new OTP, always." },
      { character: "Leia Organa", quote: "Help me, Obi-Wan Kenobi. You're my only hope to get this OTP." },
      { character: "Han Solo", quote: "Never tell me the odds! The OTP will never be the same." },
      { character: "Emperor Palpatine", quote: "Power! Unlimited power! Unlimited OTPs!" }
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    this.quote = `"${randomQuote.quote}" - ${randomQuote.character}`;
  }
}
