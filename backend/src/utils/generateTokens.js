const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
  const token = jwt.sign(
    {
      user: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return token;
};

module.exports = generateTokens;
