// 1. check if the user is actually logged in. 
// If they don't have a token, kick them back to the login page immediately.
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  
  // redirect if they are NOT on the auth.html page already
  if (!token && !window.location.pathname.includes('auth.html')) {
    alert('You must be logged in to view this page.');
    window.location.href = 'auth.html';
  }
});

// 2. handle the Logout button
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // remove the token from the browser's memory
    localStorage.removeItem('token');
    
    // send them back to the login screen
    window.location.href = 'auth.html';
  });
}