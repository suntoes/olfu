const containerElement = document.getElementById('container')
const signUpButton = document.getElementById('register')
const signInButton = document.getElementById('login')
const signUpForm = document.querySelector('.sign-up form')
const signInForm = document.querySelector('.sign-in form')

signUpButton.addEventListener('click', () => toggleForm(true))
signInButton.addEventListener('click', () => toggleForm(false))

document.getElementById('signup-form').addEventListener('submit', validateSignUp)

function toggleForm(isSignUp) {
    containerElement.classList.toggle('active', isSignUp)
    const form = isSignUp ? signUpForm : signInForm
    form.querySelectorAll('input').forEach((input) => (input.value = ''))
}

function showPopUpMessage(message) {
    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.textContent = message
    document.body.appendChild(popup)

    setTimeout(() => {
        popup.style.opacity = '1'
    }, 10)

    setTimeout(() => {
        popup.style.opacity = '0'
    }, 2000)

    setTimeout(() => {
        popup.parentNode.removeChild(popup)
    }, 2500)
}

function showEmailRegisteredMessage() {
    showPopUpMessage('Email is already registered')
}
