async function fetchQuote() {
    const response = await fetch('https://swquotesapi.vercel.app/api/random');
    const data = await response.json();
    return data;
}

async function displayQuote() {
    const quoteElement = document.getElementById('quote');
    const quoteData = await fetchQuote();
    quoteElement.innerText = `"${quoteData.text}" - ${quoteData.character}`;
    
    const colors = ['#ffcc00', '#ff9900', '#66ff66', '#6699ff', '#ff66ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    quoteElement.style.color = randomColor;
}

displayQuote();

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
        if (data.message === 'OTP sent successfully') {
            window.location.href = 'verify.html?email=' + email;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

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
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

