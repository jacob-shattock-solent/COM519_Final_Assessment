const Ukraine = require("../models/Ukraine");

exports.list = async (req, res) => {
    try {
        const ukraines = await Ukraine.find({})
        res.render("ukraines", {ukraines: ukraines});
    } catch (e) {
        res.status(404).send({message: "could not find data"})
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Ukraine.findByIdAndDelete(id)
        res.redirect("/ukraines");
    } catch (e) {
        res.status(404).send({message: "could not delete data"})
        res.redirect("/ukraines")
    }
}

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const ukraine = await Ukraine.findById(id)
        res.render("update-ukraine", {ukraine: ukraine, errors: {}});
    } catch (e) {
        res.status(404).send({message: "could not edit data"})
        res.redirect("/ukraines")
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const ukraine = await Ukraine.findById(id);
        await Ukraine.updateOne({_id: id}, req.body);
        res.redirect("/ukraines")
    } catch (e) {
        res.status(404).send({message: "could not update data"})
        res.redirect("/ukraines")
    }
}

exports.create = async (req, res) => {

    let ukraine = new Ukraine({equipment: req.body.equipment, model: req.body.model, losses_total: req.body.losses_total, captured: req.body.captured, destroyed: req.body.destroyed});

    try {
        await ukraine.save();
        res.redirect("/ukraines/?message=ukraine loss has been created");
    } catch (e) {
        return res.status(400).send({message: JSON.parse(e)})
    }

  };