const notFound = (req, res, next) => {
    res.status(404).render("404", {
        message: "Oops! Page not found.",
        detail: "We couldn't find the page you're looking for."
    });
};

// 500 Error 
const errorHandler = (err, req, res, next) => {
    console.error("Internal Server Error:"+ err.message || err);
    console.error(err.stack);

    if (err.code === 'ENOENT') {
       
        res.status(500).render("500", {
            message: "File Not Found",
            detail: "The requested template could not be found."
        });
    } else {
        res.status(500).render("500", {
            message: "Internal Server Error",
            detail: "Something went wrong on our end. Please try again later."
        });
    }
};

module.exports = { notFound, errorHandler };
