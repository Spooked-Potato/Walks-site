import { queryDatabase } from "../database.js";

export default class User {
  constructor({ id, username, password }) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static async find(username, password) {
    const result = await queryDatabase(
      "SELECT * FROM users WHERE username=? AND password=?",
      [username, password]
    );

    let userOut = null;
    if (result.success && result.data.length > 0) {
      userOut = new User(result.data[0]);
    }
    return userOut;
  }

  toJson() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
    };
  }
}
