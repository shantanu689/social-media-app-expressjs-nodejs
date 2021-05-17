module.exports.profile = (req, res) => {
  res.end("<h1>User Profile</h1>");
};

module.exports.signUp = (req, res) => {
  return res.render("user_sign_up", {
    title: "the hex | Sign Up",
  });
};

module.exports.signIn = (req, res) => {
  return res.render("user_sign_in", {
    title: "the hex | Sign In",
  });
};

module.exports.create = (req, res) => {};

module.exports.createSession = (req, res) => {};
