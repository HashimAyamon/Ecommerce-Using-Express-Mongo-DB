const isLogined = (req, res, next) => {
    try {
      if (req.session.user_id) {
        return next(); 
      }
      return res.redirect("/login"); 
    } catch (error) {
      console.error("Error in isLogined middleware:", error);
      return res.redirect("/login");
    }
  };
  
  const isLogout = (req, res, next) => {
    try {
      if (!req.session.user_id) {
        return next(); 
      }
      return res.redirect("/"); 
    } catch (error) {
      console.error("Error in isLogout middleware:", error);
      return res.redirect("/");
    }
  };
  
  module.exports = {
    isLogined,
    isLogout
  };
  