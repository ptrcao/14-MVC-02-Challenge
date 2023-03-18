const withAuth = (req, res, next) => {
    
    console.log('withAuth middleware called');
    console.log('req.session:', req.session);
    console.log('req.session.loggedIn:', req.session.loggedIn);

    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
};
  
  module.exports = withAuth;
  