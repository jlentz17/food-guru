const mainContent = document.querySelector('#main-container');
const loginBtn = document.querySelector('#login-btn')

function hideContent() {
  mainContent.classList.add('hide');
  console.log('it worked')
}

loginBtn.addEventListener('click', hideContent);