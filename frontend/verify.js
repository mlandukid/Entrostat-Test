// Event listener for the OTP verification from submission 
document.getElementById('verify-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('verify-email').value;
    const otp = document.getElementById('otp').value;
    
    // Send POST request to verify the OTP
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
        if (data.message === 'OTP verified successfully') {
            document.getElementById('message').style.color = 'green';
        } else {
            document.getElementById('message').style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
// Event listener for the back button click
document.getElementById('back-button').addEventListener('click', function () {
    window.location.href = 'index.html';
});


// Populate the email field if email parameter is present in the URL
window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        document.getElementById('verify-email').value = email;
    }
});
