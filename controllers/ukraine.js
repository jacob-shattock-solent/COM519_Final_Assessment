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
    } catch (e) {
        res.status(404).send({message: "could not delete data"})
        res.redirect("/ukraines")
    }
}