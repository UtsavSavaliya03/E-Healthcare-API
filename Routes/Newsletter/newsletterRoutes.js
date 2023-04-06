const express = require("express")
const router = new express.Router()
const newsletterController = require("../../Controllers/newsletterController.js")

router.post("/", newsletterController.subscribeNewsletter);
router.post("/sendMail", newsletterController.sendMail);

module.exports = router;