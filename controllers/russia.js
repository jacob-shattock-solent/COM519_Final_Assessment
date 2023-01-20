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

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const russia = await Russia.findById(id)
        res.render("update-russia", {russia: russia, errors: {}});
    } catch (e) {
        res.status(404).send({message: "could not edit data"})
        res.redirect("/russias")
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const russia = await Russia.findById(id);
        await Russia.updateOne({_id: id}, req.body);
        res.redirect("/russias")
    } catch (e) {
        res.status(404).send({message: "could not update data"})
        res.redirect("/russias")
    }
}

exports.create = async (req, res) => {

    let russia = new Russia({equipment: req.body.equipment, model: req.body.model, losses_total: req.body.losses_total, captured: req.body.captured, destroyed: req.body.destroyed});

    try {
        await russia.save();
        res.redirect("/russias/?message=russia loss has been created");
    } catch (e) {
        return res.status(400).send({message: JSON.parse(e)})
    }

  };
