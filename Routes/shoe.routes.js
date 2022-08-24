const express = require('express')
const router = express.Router();
const {createShoe, findOneShoe, findAllShoe, findUser, updateShoe, deleteShoe, deleteAllShoe} = require('../Controllers/shoe.controller');

router.post('/', createShoe);

router.get('/:id', findOneShoe);

router.get('/', findAllShoe);

router.get('/:id', findUser);

router.put('/:id', updateShoe);

router.delete('/:id', deleteShoe);

router.delete('/', deleteAllShoe);

module.exports = router;