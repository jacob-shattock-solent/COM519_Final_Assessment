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
    } catch (e) {
        res.status(404).send({message: "could not delete data"})
        res.redirect("/russias")
    }
}