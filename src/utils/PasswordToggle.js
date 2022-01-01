export const toggleView = () => {
  // For Switching tabs for Feature section
  const pass = document.getElementById('password');
  const view = document.getElementById('view');

  view.addEventListener('click', togglePass);

  function togglePass() {
    pass.type === 'password' ? (pass.type = 'text') : (pass.type = 'password');
  }
};
