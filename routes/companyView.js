const express = require('express');
const router = express.Router();
router.get('/', async(req,res)=> {
    res.render('company/profile', { title: "Company Details" ,  auth: true, notLoginPage: true});
})

module.exports = router;