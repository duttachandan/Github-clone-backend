const ErrorResponse = require("../utils/ErrorResponse");
const logoModel = require('../schema/Image.schema')


class ContentController {
    async getLogo(req, res) {
        const { subTitle } = req.body;
        const { path } = req.file;
        if (!path || !subTitle) {
            throw new ErrorResponse(404, "Image or Title is not defined");
        }
        try {
            const newLogo = new logoModel({
                logo: path,
                subTitle: subTitle
            });
            const response = await newLogo.save();
            res.json(response);
        } catch (error) {
            throw new ErrorResponse(404, error.message);
        }
    }
    async updateLogo(req, res) {
        try {
            // const response = 
            res.json({
                message: "Working Fine",
                success: true,
            });
        } catch (error) {
            throw new ErrorResponse(404, error.message);
        }
    }
}

module.exports = new ContentController;

