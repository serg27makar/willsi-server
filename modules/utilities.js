const nodemailer = require ('nodemailer');

const adminEmail = "startwillsi@gmail.com";
const willsiEmail = "info@willsi.top";
const password = "123Willsi!";

const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: adminEmail,
        pass: password,
    }
});


module.exports.sendEmailToWillsi = function (data) {
    const {UserName, UserPhone} = data;
    const mailOptions = {
        from: `Willsi <${adminEmail}>`,
        to: willsiEmail,
        subject: 'Application for cooperation',
        html: `<p> Имя клиента ${UserName}, телефон клиента ${UserPhone}</p>`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error("Mail not sent", err);
            throw new Error("Mail not sent");
        }
    });
};

module.exports.isEmptyObject = function (obj) {
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
};


module.exports.SearchParams = function(body) {
    let product = {};
    let size = {};
    if (body.SearchParams) {
        const {growth, shoulder, chest, waist, hips, thighGirth,
            palmGirth, headCircumference, armGirth, fingerLength,
            waistAtNavelLevel, insideLegLength, footLength, wideFootGirth,
            footCircumference, neckGirth, frontPawsLength, chestGirth, growthDog,
            waistDog, hindFeetLength, legLength, legWidth, legCircumference} = body.SearchParams;

        if (body.topCatalog === "catalogListDog") {

            if (neckGirth) size = {...size, "size.neckGirth": {$gte : Number(neckGirth)}};
            if (frontPawsLength) size = {...size, "size.frontPawsLength": {$gte : Number(frontPawsLength)}};
            if (chestGirth) size = {...size, "size.chestGirth": {$gte : Number(chestGirth)}};
            if (growthDog) size = {...size, "size.growthDog": {$gte : Number(growthDog)}};
            if (waistDog) size = {...size, "size.waistDog": {$gte : Number(waistDog)}};
            if (hindFeetLength) size = {...size, "size.hindFeetLength": {$gte : Number(hindFeetLength)}};
            if (legLength) size = {...size, "size.legLength": {$gte : Number(legLength)}};
            if (legWidth) size = {...size, "size.legWidth": {$gte : Number(legWidth)}};
            if (legCircumference) size = {...size, "size.legCircumference": {$gte : Number(legCircumference)}};

        } else {

            if (body.subCatalog === ("subCatalogListMenTshirts" || "subCatalogListWomenTshirts" || "subCatalogListBoyTshirts" || "subCatalogListGirlTshirts")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (shoulder) size = {...size, "size.shoulder": {$gte : Number(shoulder)}};
                if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
                if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
                if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            } else if (body.subCatalog === ("subCatalogListMenShirts" || "subCatalogListWomenShirts" || "subCatalogListBoyShirts" || "subCatalogListGirlShirts")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (headCircumference) size = {...size, "size.headCircumference": {$gte : Number(headCircumference)}};
                if (armGirth) size = {...size, "size.armGirth": {$gte : Number(armGirth)}};
                if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
                if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            } else if (body.subCatalog === ("subCatalogListMenPants" || "subCatalogListWomenPants" || "subCatalogListBoyPants" || "subCatalogListGirlPants")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (insideLegLength) size = {...size, "size.insideLegLength": {$gte : Number(insideLegLength)}};
                if (thighGirth) size = {...size, "size.thighGirth": {$gte : Number(thighGirth)}};
            } else if (body.subCatalog === ("subCatalogListMenUnderwear" || "subCatalogListWomenUnderwear" || "subCatalogListBoyUnderwear" || "subCatalogListGirlUnderwear")) {
                if (insideLegLength) size = {...size, "size.insideLegLength": {$gte : Number(insideLegLength)}};
                if (footLength) size = {...size, "size.footLength": {$gte : Number(footLength)}};
                if (wideFootGirth) size = {...size, "size.wideFootGirth": {$gte : Number(wideFootGirth)}};
                if (footCircumference) size = {...size, "size.footCircumference": {$gte : Number(footCircumference)}};
            } else if (body.subCatalog === ("subCatalogListMenOuterwear" || "subCatalogListWomenOuterwear" || "subCatalogListBoyOuterwear" || "subCatalogListGirlOuterwear")) {
                if (palmGirth) size = {...size, "size.palmGirth": {$gte : Number(palmGirth)}};
                if (fingerLength) size = {...size, "size.fingerLength": {$gte : Number(fingerLength)}};
                if (waistAtNavelLevel) size = {...size, "size.waistAtNavelLevel": {$gte : Number(waistAtNavelLevel)}};
                if (shoulder) size = {...size, "size.shoulder": {$gte : Number(shoulder)}};
            } else if (body.subCatalog === ("subCatalogListMenHome" || "subCatalogListWomenHome" || "subCatalogListBoyHome" || "subCatalogListGirlHome")) {
                if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
                if (headCircumference) size = {...size, "size.headCircumference": {$gte : Number(headCircumference)}};
                if (palmGirth) size = {...size, "size.palmGirth": {$gte : Number(palmGirth)}};
                if (fingerLength) size = {...size, "size.fingerLength": {$gte : Number(fingerLength)}};
                if (insideLegLength) size = {...size, "size.legCircumference": {$gte : Number(insideLegLength)}};
            } else {
                size = {...size, "size.general": "general"}
            }
        }
    }
    if (size) product = {...product, size};
    return product;
};
