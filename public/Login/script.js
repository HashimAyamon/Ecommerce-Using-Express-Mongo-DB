document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    // console.log('Email:', email);
    // console.log('Password:', password);

 
    this.reset(); 
});


