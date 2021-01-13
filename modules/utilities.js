const nodemailer = require ('nodemailer');

const adminEmail = "startwillsi@gmail.com";
const willsiEmail = "info@willsi.top";
const password = "123Willsi!";
const subjectTypes = {
    "afc": "Application for cooperation",
    "shm": "Support message",
}

const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: adminEmail,
        pass: password,
    }
});


module.exports.sendEmailToWillsi = function (data) {
    const {UserName, UserPhone, UserID, message, subject} = data;
    const message1 = `<p> Имя клиента ${UserName}, телефон клиента ${UserPhone}</p>`;
    const message2 = `<p> ID клиента ${UserID}, сообщение клиента ${message}</p>`;
    const mailOptions = {
        from: `Willsi <${adminEmail}>`,
        to: willsiEmail,
        subject: subjectTypes[subject],
        html: subject === "afc" ? message1 : message2,
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
        const {
            chest,
            waist,
            hips,
            armGirth,
            growth,
            thighGirth,
            headCircumference,
            palmGirth,
            fingerLength,
            armLength,
            shoulder,
            insideLegLength,
            footLength,
            wideFootGirth,
            footCircumference,

            neckGirth,
            frontPawsLength,
            chestGirth,
            growthDog,
            waistDog,
            hindFeetLength,
            legLength,
            legWidth,
            legCircumference,
        } = body.SearchParams;

        if (body.subCatalog === ("subCatalogListMenTshirts" || "subCatalogListWomenTshirts" ||
            "subCatalogListBoyTshirts" || "subCatalogListGirlTshirts")) {
            if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
            if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
            if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            if (armGirth) size = {...size, "size.armGirth": {$gte : Number(armGirth)}};
            if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
            if (shoulder) size = {...size, "size.shoulder": {$gte : Number(shoulder)}};
        } else if (body.subCatalog === ("subCatalogListMenShirts" || "subCatalogListWomenShirts" ||
            "subCatalogListBoyShirts" || "subCatalogListGirlShirts")) {
            if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
            if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
            if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            if (armGirth) size = {...size, "size.armGirth": {$gte : Number(armGirth)}};
            if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
            if (armLength) size = {...size, "size.armLength": {$gte : Number(armLength)}};
            if (shoulder) size = {...size, "size.shoulder": {$gte : Number(shoulder)}};
        } else if (body.subCatalog === ("subCatalogListMenPants" || "subCatalogListWomenPants" ||
            "subCatalogListBoyPants" || "subCatalogListGirlPants")) {
            if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
            if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
            if (thighGirth) size = {...size, "size.thighGirth": {$gte : Number(thighGirth)}};
            if (insideLegLength) size = {...size, "size.insideLegLength": {$gte : Number(insideLegLength)}};
        } else if (body.subCatalog === ("subCatalogListMenUnderwear" || "subCatalogListWomenUnderwear" ||
            "subCatalogListBoyUnderwear" || "subCatalogListGirlUnderwear")) {
            if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
            if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
            if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
            if (thighGirth) size = {...size, "size.thighGirth": {$gte : Number(thighGirth)}};
            if (insideLegLength) size = {...size, "size.insideLegLength": {$gte : Number(insideLegLength)}};
        } else if (body.subCatalog === ("subCatalogListMenOuterwear" || "subCatalogListWomenOuterwear" ||
            "subCatalogListBoyOuterwear" || "subCatalogListGirlOuterwear")) {
            if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
            if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
            if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            if (armGirth) size = {...size, "size.armGirth": {$gte : Number(armGirth)}};
            if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
            if (armLength) size = {...size, "size.armLength": {$gte : Number(armLength)}};
            if (shoulder) size = {...size, "size.shoulder": {$gte : Number(shoulder)}};
        } else if (body.subCatalog === ("subCatalogListMenHome" || "subCatalogListWomenHome" ||
            "subCatalogListBoyHome" || "subCatalogListGirlHome")) {
            if (chest) size = {...size, "size.chest": {$gte : Number(chest)}};
            if (waist) size = {...size, "size.waist": {$gte : Number(waist)}};
            if (hips) size = {...size, "size.hips": {$gte : Number(hips)}};
            if (growth) size = {...size, "size.growth": {$gte : Number(growth)}};
            if (armLength) size = {...size, "size.armLength": {$gte : Number(armLength)}};
            if (shoulder) size = {...size, "size.shoulder": {$gte : Number(shoulder)}};
            if (insideLegLength) size = {...size, "size.insideLegLength": {$gte : Number(insideLegLength)}};

        } else if (body.subCatalog === ("subCatalogListDogPants")) {
            if (growthDog) size = {...size, "size.growthDog": {$gte : Number(growthDog)}};
            if (waistDog) size = {...size, "size.waistDog": {$gte : Number(waistDog)}};
            if (hindFeetLength) size = {...size, "size.hindFeetLength": {$gte : Number(hindFeetLength)}};
        } else if (body.subCatalog === ("subCatalogListDogShirts")) {
            if (neckGirth) size = {...size, "size.neckGirth": {$gte : Number(neckGirth)}};
            if (frontPawsLength) size = {...size, "size.frontPawsLength": {$gte : Number(frontPawsLength)}};
            if (chestGirth) size = {...size, "size.chestGirth": {$gte : Number(chestGirth)}};
            if (growthDog) size = {...size, "size.growthDog": {$gte : Number(growthDog)}};
        } else if (body.subCatalog === ("subCatalogListDogOveralls")) {
            if (neckGirth) size = {...size, "size.neckGirth": {$gte : Number(neckGirth)}};
            if (frontPawsLength) size = {...size, "size.frontPawsLength": {$gte : Number(frontPawsLength)}};
            if (chestGirth) size = {...size, "size.chestGirth": {$gte : Number(chestGirth)}};
            if (growthDog) size = {...size, "size.growthDog": {$gte : Number(growthDog)}};
            if (waistDog) size = {...size, "size.waistDog": {$gte : Number(waistDog)}};
            if (hindFeetLength) size = {...size, "size.hindFeetLength": {$gte : Number(hindFeetLength)}};
            if (legLength) size = {...size, "size.legLength": {$gte : Number(legLength)}};
            if (legWidth) size = {...size, "size.legWidth": {$gte : Number(legWidth)}};
            if (legCircumference) size = {...size, "size.legCircumference": {$gte : Number(legCircumference)}};
        } else if (body.subCatalog === ("subCatalogListDogCap")) {
            if (legLength) size = {...size, "size.legLength": {$gte : Number(legLength)}};
            if (legWidth) size = {...size, "size.legWidth": {$gte : Number(legWidth)}};
            if (legCircumference) size = {...size, "size.legCircumference": {$gte : Number(legCircumference)}};
        } else {
            size = {...size, "size.general": "general"}
        }
    }
    if (size) product = {...product, size};
    return product;
};
