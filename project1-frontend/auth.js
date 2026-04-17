const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggleBtn = document.getElementById('toggle-btn');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');

let isLoginView = true;

// toggle between login and register views
toggleBtn.addEventListener('click', () => {
  isLoginView = !isLoginView;
  if (isLoginView) {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    formTitle.innerText = 'Welcome Back';
    formSubtitle.innerText = 'Login to your account.';
    toggleBtn.innerText = "Don't have an account? Register here.";
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    formTitle.innerText = 'Create Account';
    formSubtitle.innerText = 'Join to share your recipes!';
    toggleBtn.innerText = "Already have an account? Login here.";
  }
});

// handle login Submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (data.success) {
      // Save token and redirect
      localStorage.setItem('token', data.token);
      alert('Logged in successfully!');
      window.location.href = 'meal-generator.html'; // Redirect to main app
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Server error during login.');
  }
});

// handle register submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const first_name = document.getElementById('reg-fname').value;
  const last_name = document.getElementById('reg-lname').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, last_name, email, password })
    });
    
    const data = await res.json();
    if (data.success) {
      alert('Registration successful! Please login.');
      toggleBtn.click(); // Automatically flip back to login view
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Server error during registration.');
  }
});