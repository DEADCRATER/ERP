const jwt = require('jsonwebtoken');

const generateTokens = (userId,role) => {
  const accessToken = jwt.sign({ id: userId,role:role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1d'
  });

  const refreshToken = jwt.sign({ id: userId,role:role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d'
  });

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
