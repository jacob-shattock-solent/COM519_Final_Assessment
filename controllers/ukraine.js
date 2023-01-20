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

exports.create = async (req, res) => {

    let ukraine = new Ukraine({name: req.body.name, model: req.body.model});

    try {
        await ukraine.save();
        res.redirect("/ukraines/?message=ukraine loss has been created");
    } catch (e) {
        return res.status(400).send({message: JSON.parse(e)})
    }

  };