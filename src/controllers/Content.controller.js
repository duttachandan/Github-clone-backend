const ErrorResponse = require("../utils/ErrorResponse");
const logoModel = require('../schema/Image.schema')


class ContentController {
    async getLogo() {
        try{
            const response = await logoModel();
        }catch(error){
            throw new ErrorResponse(404, error.message);
        }
    }
    async updateLogo() {
        try{

        }catch(error){
            throw new ErrorResponse(404, error.message);
        }
    }
}