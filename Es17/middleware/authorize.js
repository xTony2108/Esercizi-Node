const passport = require("passport");

const authorize = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({ message: "Non sei autorizzato" });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

module.exports = authorize;
