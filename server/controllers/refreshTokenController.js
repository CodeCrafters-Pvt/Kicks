const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  const user = await userModel.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        // Delete refresh tokens of hacked user
        const hackedUser = await userModel
          .findOne({ "userAccount.username": decoded.username })
          .exec();
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = user.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // expired refresh token
        user.refreshToken = [...newRefreshTokenArray];
        const result = await user.save();
      }
      if (err || user.userAccount.username !== decoded.username) {

        return res.sendStatus(403);
      }

      // Refresh token was still valid
      // const roles = Object.values(user.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            // "roles": roles
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
      );

      const newRefreshToken = jwt.sign(
        { username: user.userAccount.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "3d" }
      );
      // Saving refreshToken with current user
      user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await user.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      const { userAccount, _id, email, role, isPremium, isActive } = user;
      const { username } = userAccount;
      const userDetails = {
        _id,
        role,
        email,
        username,
        isPremium,
        isActive,
      };

      res.json({ accessToken, user: userDetails });
    }
  );
};

module.exports = { handleRefreshToken };
