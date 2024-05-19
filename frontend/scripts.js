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
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('verify-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('verify-email').value;
    const otp = document.getElementById('otp').value;
    fetch('/api/otp/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('verify-message').innerText = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
