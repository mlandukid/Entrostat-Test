
# Entrostat OTP System

## Project Overview

The Entrostat OTP System is a secure One-Time Password (OTP) generation and verification application built using Node.js, Express.js and Redis. The system includes a frontend for user interaction and a backend API for OTP generation and verification. Additionally, the project includes Swagger documentation for API endpoints and a fun element with random Star Wars quotes.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Execution](#setup-and-execution)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [Unit Testing](#unit-testing)
- [Design Choices](#design-choices)
- [Improvements](#improvements)
- [Fun Elements](#fun-elements)

## Features

- OTP generation and verification
- Rate limiting for OTP requests
- Resend OTP functionality
- Frontend forms for user interaction
- API documentation with Swagger
- Random Star Wars quotes for fun

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: Redis
- **Frontend**: HTML, CSS, JavaScript
- **API Documentation**: Swagger
- **Testing**: Jest


## Setup and Execution

### Prerequisites

- Node.js and npm
- Redis

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/entrostat-otp.git
   cd entrostat-OTP

2. **Backend setup:**
   ```sh
   cd backend 
   npm install

3. **Frontend setup:**
No additional setup is required for the frontend; it is included within the project directory.

### Configuration

1. **Backend Environment Variables:**

The .env file in the backend directory has the following Configuration
  ```sh
  SMTP_HOST=127.0.0.1
SMTP_PORT=2500
SMTP_USER=inbucket
SMTP_PASS=inbucket
SMTP_FROM=no-reply@entrostat.xyz
OTP_EXPIRY_SECONDS=30
OTP_REQUEST_LIMIT_PER_HOUR=3
OTP_RESEND_EXPIRY_MINUTES=5
OTP_RESEND_LIMIT=3
```

## Running the Project

### Starting the Server

1. **Backend:**
```
cd backend
node app.js
```
 you should see a starting application followed by connected to Redis message from there you will proceed to Accessing the application to view the frontend

2. **Accessing the Application**

- Application URL: https://loyiso-8080.entrostat.dev
- Swagger Documentation: https://loyiso-8080.entrostat.dev/api-docs

## API Endpoints

OTP Generation
Endpoint: /api/otp/generate
Method: POST
```
Payload: { "email": "user@example.com" }
Response: { "message": "OTP sent successfully" }
```

OTP Verification
Endpoint: /api/otp/verify
Method: POST
```
Payload: { "email": "user@example.com", "otp": "123456" }
Response: { "message": "OTP verified successfully" }
```

## Swagger Documentation

Swagger documentation is essential for providing a clear and interactive representation of the API. It helps developers understand the available endpoints, request parameters, and responses. 
I have decided to add one to help provided clearity and practice good coding principles 

You can access the Swagger documentation at https://loyiso-8080.entrostat.dev/api-docs.

## Unit Testing

Unit tests are implemented using Jest to ensure the reliability of the OTP generation and verification logic. To run the tests, execute the following command in the backend directory:

```
npm test
```

## Design Choices

- Separation of Concerns: The project is structured to separate the frontend and backend, making it easier to maintain and scale.

- Redis for OTP Storage: Redis is used for storing OTPs due to its fast read/write operations and built-in expiry mechanism.

- PostgreSQL for Persistent Storage: PostgreSQL is used for storing user-related data, providing robust data integrity and security features.

- Rate Limiting: Implemented to prevent abuse by limiting the number of OTP requests per hour and the number of resends.

- Hashing OTPs: OTPs are hashed before being stored in Redis to enhance security. Hashing ensures that even if someone gains access to the Redis database, the OTPs cannot be 
  easily retrieved.

## Improvements

- Enhanced Security: Implement measures such as encryption for sensitive data and more sophisticated rate-limiting mechanisms.

- Scalability: Implement load balancing and consider using a cloud-based Redis service for better scalability.

## Fun Elements

To add an element of fun, random Star Wars quotes are displayed on the frontend pages. These quotes are fetched from the SWQuotes API. This not only makes the user experience more enjoyable but also showcases the flexibility of the application in integrating external APIs.The frontend now fetches a list of Star Wars characters from the SWAPI and displays a quote from a randomly selected character. Here is the code: 

```

// Function to fetch a list of Star Wars characters from SWAPI
async function fetchCharacter() {
    try {
        const response = await fetch('https://swapi.dev/api/people/');
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching character data:', error);
        return [];
    }
}

// Function to display a Star Wars quote at the top of the page
async function displayQuote() {
    const quoteElement = document.getElementById('quote');
    const characters = await fetchCharacter();
    
    // If no characters were fetched, display an error message
    if (characters.length === 0) {
        quoteElement.innerText = "An error occurred while fetching the quote.";
        return;
    }

    // Select a random character from the fetched list
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

    // Predefined quotes for specific characters
    const quotes = {
        "Luke Skywalker": "I am a Jedi, like my father before me, oh and he always provided OTPs.",
        "Darth Vader": "I find your lack of faith and OTP disturbing.",
        "Yoda": "Do, or do not. There is no try. OTP needed",
        "Obi-Wan Kenobi": "The Force will be with you, and a new OTP, always.",
        "Leia Organa": "Help me, Obi-Wan Kenobi. You're my only hope to get this OTP",
        "Han Solo": "Never tell me the odds! The OTP will never be the same ",
        "Emperor Palpatine": "Power! Unlimited power! Unlimited OTPs!"
    };

    // Select a quote based on the character's name or provide a default quote
    const quote = quotes[randomCharacter.name] || "May the Force and the OTP be with you.";
    quoteElement.innerText = `"${quote}" - ${randomCharacter.name}`;
}

// Initial call to display a quote when the page loads
displayQuote();
```

## How to Make It better
- Quote Caching: Implement caching for the quotes to reduce the number of API calls.
- Customization: Allow users to choose their favorite Star Wars character and display quotes from that character only.
- Interactive Elements: Add animations or interactive elements to make the quotes more engaging.