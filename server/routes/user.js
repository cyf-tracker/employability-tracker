const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl);
router.patch('/update', userCtrl);
router.delete('/delete', userCtrl);


// logout
// delete
//  update

module.exports = router;