const { ObjectID } = require("bson");
const express = require("express");
const router = express.Router();
const objectID = require("mongoose").Types.ObjectId;

const { PostsModel } = require("../models/postsModel");

router.get("/", (req, res) => {
  // pour la recuperation des données
  PostsModel.find((err, docs) => {
    // console.log(docs);
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  });
});

router.post("/", (req, res) => {
  // pour la creation des données
  const newRecord = new PostsModel({
    author: req.body.author,
    message: req.body.message,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error creating new data : " + err);
  });
});

router.put("/:id", (req, res) => {
  // pour la mise a jour ou modification des données
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unkwon : " + req.params.id);

  const updateRecord = {
    author: req.body.author,
    message: req.body.message,
  };

  PostsModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
});

router.delete("/:id", (req, res) => {
  // pour la suppression des données
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unkwon : " + req.params.id);

  PostsModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
});

module.exports = router;
