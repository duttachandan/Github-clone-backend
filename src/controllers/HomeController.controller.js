const ErrorResponse = require("../utils/ErrorResponse");

class HomeController {
    async HomePath(req, res) {
        try {
            // const response = await ;
            res.json({
                success: true,
                message: "login successfull"
            });
        } catch (error) {
            throw new ErrorResponse(404, error.message);
        }
    }
}

module.exports = new HomeController();