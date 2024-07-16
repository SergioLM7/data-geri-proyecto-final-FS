const manage404 = (req,res, next) => {
    res.status(404).json({
        msj:"404 not found",
        img: "../public/assets/image-not-found-author-bamdewanto.jpg"
    });
}

module.exports = manage404;