export function isUser(req, res, next) {
  if (req.session?.user?.email) {
      return next();
  }
  return res.status(401).render('error', {error: 'User Authentication error'});
};

export function isAdmin(req, res, next) {
  if (req.session?.user?.email && req.session?.user?.admin == true) {
      return next();
  }
  return res.status(403).render('error', {error: 'Authorization error'});
};
