const express = require("express");
const Db = require("./server-model");
const server = express();

server.use(express.json());

const validateID = (req, res, next) => {
  Db.getById(req.params.id).then((data) => {
    if (data === undefined) {
      res.status(400).json({ message: "Resource not found" });
    } else {
      next();
    }
  });
};

server.get("/", (req, res) => {
  Db.getAll().then((data) => {
    res.status(200).json(data);
  });
});

server.get("/:id", validateID, (req, res) => {
  Db.getById(req.params.id).then((data) => {
    res.status(200).json(data);
  });
});

server.post("/", validateID, (req, res) => {
  Db.create(req.body).then((data) => {
    Db.getById(data).then((data) => {
      res.status(200).json(data);
    });
  });
});

server.put("/:id", validateID, (req, res) => {
  const id = req.params.id;
  Db.update(id, req.body).then(() => {
    Db.getById(id).then((data) => {
      res.status(200).json(data);
    });
  });
});

server.delete("/:id", validateID, (req, res) => {
  Db.delete(req.params.id).then(() => {
    res.status(200).json({ message: "Record Deleted" });
  });
});

module.exports = server;
