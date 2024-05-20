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

// Event listener for the OTP form submission
document.getElementById('otp-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    fetch('/api/otp/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
        window.location.href = 'verify.html?email=' + encodeURIComponent(email);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Event listener for the resend OTP button
document.getElementById('resend-button').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    if (!email) {
        document.getElementById('message').innerText = 'Please enter an email first.';
        return;
    }
    fetch('/api/otp/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
        window.location.href = 'verify.html?email=' + encodeURIComponent(email);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
