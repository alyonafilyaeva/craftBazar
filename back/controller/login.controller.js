const db = require("../db");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";
const refreshTokens = [];

class LoginController {
  async loginUser(req, res) {
    const { login, password } = req.body;
    const user = await db.query(
      "SELECT * FROM users, passwords WHERE users.login = $1 AND users.id = passwords.user_id AND passwords.hash_password = $2",
      [login, password]
    );
    console.log(user.rows);
    if (user.rows.length) {
      const accessToken = jwt.sign(
        { login: user.rows[0].login, role: user.rows[0].role, id: user.rows[0].id },
        accessTokenSecret,
        { expiresIn: "60m" }
      );
      const refreshToken = jwt.sign(
        { login: user.rows[0].login, role: user.rows[0].role, id: user.rows[0].id },
        refreshTokenSecret
      );
      refreshTokens.push(refreshToken);
      console.log("refresh tokens", refreshTokens)
      res.json({
        accessToken,
        refreshToken,
      });
    } else {
      res.send("Username or password incorrect");
    }
  }
}

module.exports = new LoginController();
