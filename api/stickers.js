const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next){
    if(!isNaN(req.params.id)) 
    return next();
    next(new Error('Invalid ID'));
}

function validSticker(sticker){
    const hasTitle = typeof sticker.title === 'string' && sticker.title.trim() !== ('');
    const hasUrl = typeof sticker.url === 'string' && sticker.url.trim() !== ('');
    const hasDescription = typeof sticker.description === 'string' && sticker.description.trim() !== ('');
    const hasRating = !isNaN(sticker.rating);
    return hasTitle && hasUrl && hasDescription && hasRating;
}

router.get('/', (req, res) => {
    queries.getAll().then(stickers => {
        res.json(stickers);
    });
});

router.get('/:id', isValidId, (req, res) => {
    queries.getOne(req.params.id).then(sticker => {
        if(sticker){
            res.json(sticker);
        }
    });
});

router.post('/', (req, res, next) => {
    if(validSticker(req.body)) {
        queries.create(req.body).then(stickers => {
            res.json(stickers[0]);
        });
    } else {
        next(new Error ('Invalid Sticker'));
    };
}); 

router.put('/:id', isValidId, (req, res, next) => {
    if(validSticker(req.body)) {
        queries.update(req.params.id, req.body).then(stickers =>{
            res.json(stickers[0]);
        });
    } else {
        next(new Error ('Invalid Sticker'));
    };
});

router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
});
    

module.exports = router;