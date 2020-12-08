const db = require("../data/dbConfig.js");

module.exports = {
  getAll() {
    return db("accounts");
  },
  getById(id) {
    return db("accounts").where("id", id).first();
  },
  create(data) {
    return db("accounts").insert(data);
  },
  update(id, data) {
    return db("accounts").where("id", id).update(data);
  },
  delete(id) {
    return db("accounts").where("id", id).del();
  },
};
