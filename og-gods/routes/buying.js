const express = require("express");
const buyingRouter = express.Router();
const Buying = require("../models/buying");

buyingRouter.get("/", (req, res, next) => {
    Buying.find({ user: req.user._id }, (err, buying) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(buying);
    });
});

buyingRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newBuy = new Buying(req.body);
    newBuy.save((err, newBuying) =>{
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(newBuying);
    });
});

buyingRouter.get("/", (req, res, next) => {
    Buying.find({user: req.user._id}, (err, buying) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(buying);
    });
});

buyingRouter.delete("/:buyingId", (req, res, next) => {
    Buying.findOneAndRemove(
        {_id: req.params.todoId, user: req.user._id}, 
        (err, deletedBuying) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send({msg: "More for somebody else", deletedBuying})
    })
})

module.exports = buyingRouter