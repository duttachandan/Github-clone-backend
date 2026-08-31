const ErrorResponse = require("../utils/ErrorResponse");
const logoModel = require('../schema/Image.schema')


class ContentController {
    async updateLogo(req, res) {
        const { subTitle } = req.body;
        const { path } = req.file;
        if (!path || !subTitle) {
            throw new ErrorResponse(404, "Image or Title is not defined");
        }
        try {
            const newLogoInsert = await logoModel.replaceOne(
                { type: "WebsiteLogo" },
                {
                    logo: path,
                    subTitle: subTitle,
                },
                {
                    upsert: true
                }
            );
            res.json({
                success: true,
                data: newLogoInsert
            });
        } catch (error) {
            throw new ErrorResponse(404, error.message);
        }
    }
    async getLogo(req, res) {
        try {
            const response = await logoModel.find({});
            res.json({
                data: response,
                success: true,
            });
        } catch (error) {
            throw new ErrorResponse(404, error.message);
        }
    }
}

module.exports = new ContentController;

