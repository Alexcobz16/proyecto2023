function Logout() {
  localStorage.removeItem('session');
  window.location.href = '/';
}

export default Logout;