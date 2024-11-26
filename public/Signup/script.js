document.addEventListener("DOMContentLoaded", function () {
    const formData = { name: '', email: '', password: '' };
    const isValid = { name: false, email: false, passwordLength: false, passwordNumber: false, passwordSpecial: false };
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signupButton = document.getElementById('signupButton');
    const hoverAlert = document.getElementById('hoverAlert');

    const updateValidationStatus = () => {
        document.getElementById('nameValidation').querySelector('.circle').className = isValid.name ? 'circle valid' : 'circle invalid';
        document.getElementById('emailValidation').querySelector('.circle').className = isValid.email ? 'circle valid' : 'circle invalid';
        document.getElementById('passwordLengthValidation').querySelector('.circle').className = isValid.passwordLength ? 'circle valid' : 'circle invalid';
        document.getElementById('passwordNumberValidation').querySelector('.circle').className = isValid.passwordNumber ? 'circle valid' : 'circle invalid';
        document.getElementById('passwordSpecialValidation').querySelector('.circle').className = isValid.passwordSpecial ? 'circle valid' : 'circle invalid';
    };

    const validateForm = () => {
        isValid.name = nameInput.value.length >= 3 && !/\s/.test(nameInput.value);
        isValid.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        isValid.passwordLength = passwordInput.value.length >= 8;
        isValid.passwordNumber = /\d/.test(passwordInput.value);
        isValid.passwordSpecial = /[!@#$%^&*]/.test(passwordInput.value);
        
        updateValidationStatus();

        const allValid = Object.values(isValid).every(Boolean);
        signupButton.disabled = !allValid;
    };

    nameInput.addEventListener('input', (e) => { formData.name = e.target.value; validateForm(); });
    emailInput.addEventListener('input', (e) => { formData.email = e.target.value; validateForm(); });
    passwordInput.addEventListener('input', (e) => { formData.password = e.target.value; validateForm(); });

  
});
