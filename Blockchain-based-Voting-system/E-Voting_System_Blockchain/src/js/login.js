// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const aadharNumber = document.getElementById('lidNumber').value;
        const password = document.getElementById('lpassword').value;
        
        // Show loader
        document.getElementById('loader').style.display = 'block';
        document.getElementById('content').style.display = 'none';
        
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    aadhar: aadharNumber,
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Login successful
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('aadharNumber', aadharNumber);
                
                // Initialize the blockchain connection
                await App.init();
                
                // Hide loader
                document.getElementById('loader').style.display = 'none';
                document.getElementById('content').style.display = 'block';
                
                // Redirect to vote page
                window.location.href = 'vote.html';
            } else {
                // Login failed
                alert(data.message || 'Login failed. Please check your credentials.');
                
                // Hide loader
                document.getElementById('loader').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
            
            // Hide loader
            document.getElementById('loader').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        }
    });
}); 