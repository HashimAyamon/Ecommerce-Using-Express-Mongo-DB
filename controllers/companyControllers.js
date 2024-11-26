const bcrypt = require('bcrypt'); 
const Company = require('../models/Company'); 

const getHome = (req, res) => {
    try {
        res.render('home'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const getSignup = (req, res) => {
    try {
        res.render('signup'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const signupCompany = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || name.length < 3) {
        return res.status(400).json({ error: "Name must be at least 3 characters long." });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: "Please enter a valid company email." });
    }
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
        return res.status(400).json({ error: "Password must be at least 8 characters long, with at least 1 number and 1 special character." });
    }

    try {
    
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ error: "Company with this email already exists." });
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const company = new Company({ name, email, password: hashedPassword });
        await company.save();
        console.log("Company created successfully:", company);
        
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error. Please try again later." });
    }
};


const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

module.exports = { getHome, getSignup, signupCompany };
