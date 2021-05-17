module.exports.home = (req, res) => {
  console.log(req.cookies);
  return res.end("<h1>Express is up for the hex</h1>");
};
