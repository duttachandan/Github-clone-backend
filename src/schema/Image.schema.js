const mongoose = require('mongoose');

const LogoSchema = mongoose.Schema({
    logo: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: "WebsiteLogo"
    }
});

const logoModel = mongoose.model('logo', LogoSchema);

module.exports = logoModel;



