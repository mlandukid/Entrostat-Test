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
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        document.getElementById('verify-email').value = email;
    }
});
