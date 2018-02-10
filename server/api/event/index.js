'use strict';

import {Router} from 'express';
var controller = require('./event.controller');

var router = new Router();

router.get('/:text/search', controller.search);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
