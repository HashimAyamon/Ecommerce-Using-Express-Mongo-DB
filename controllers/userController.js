const User = require("../models/User");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const getSignup = async (req, res) => {
   try {
        const error = undefined;
        return res.render("signup", { error });
   } catch (error) {
        console.error(" Error in getSignup: "+error);
        return res.render("500");
   }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await hashPassword(password);
     
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("signup", { error: "This Email Already Exists" });
        }else if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            return res.render("signup", { error: "Your password must be at least 8 characters long, with at least 1 number and 1 special character" });
        }else if (!name || name.length < 3) {
            return res.render("signup", { error: "Name must be at least 3 characters long" });
        }else if (!validateEmail(email)) {
            return res.render("signup", { error: "Please enter a valid email" });
        }else{
            const user = await User.create({ name, email, password : hashedPassword });
            if (user) {
                console.log(" user document created:");
                return res.redirect("/login");
            }
        }
       
    } catch (error) {
        console.error(" Error in createUser: "+error);
        return res.render("500");
    }
};

const getLogin = async (req, res) => {
    try {
        const error = undefined;
        const email = undefined;
        return res.render("login", { error ,email});
    } catch (error) {
        console.error(" Error in getlogin: "+error);
        return res.render("500");
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.render("login", { error: "Invalid email or password." });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.render("login", { error: "Invalid password", email: email });
        }

 
        req.session.user_id = user._id; 

        // // Optionally, generate a JWT and set it as a cookie
        // const token = jwt.sign({ id: user._id }, 'your-jwt-secret', { expiresIn: '1h' });
        // res.cookie('jwt', token, { httpOnly: true });

        console.log("User logged in:");
        return res.redirect('/');
    } catch (error) {
        console.error("Error in loginUser: " + error);
        return res.render("500");
    }
};


const getHome = (req, res) => {
    try {
        return res.render('home'); 
    } catch (error) {
        console.error(" Error in getHome: "+error);
        return res.render("500");
    }
};

const logoutUser = (req, res) => {
    try {

      req.session.destroy((err) => {
        if (err) {
          console.error("Error in logoutUser:", err);
          return res.render("500");
        }
        return res.redirect("/login"); 
      });
    } catch (error) {
      console.error("Error in logoutUser:", error);
      return res.render("500");
    }
  };

module.exports = {
     getSignup ,
     createUser,
     getLogin,
     loginUser,
     getHome,
     logoutUser
};

