const Russia = require("../models/Russia");

exports.list = async (req, res) => {
    try {
        const russias = await Russia.find({})
        res.render("russias", {russias: russias});
    } catch (e) {
        res.status(404).send({message: "could not find data"})
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Russia.findByIdAndDelete(id)
        res.redirect("/russias");
    } catch (e) {
        res.status(404).send({message: "could not delete data"})
        res.redirect("/russias")
    }
}

exports.create = async (req, res) => {

    let russia = new Russia({name: req.body.name, model: req.body.model});

    try {
        await russia.save();
        res.redirect("/russias/?message=russia loss has been created");
    } catch (e) {
        return res.status(400).send({message: JSON.parse(e)})
    }

  };