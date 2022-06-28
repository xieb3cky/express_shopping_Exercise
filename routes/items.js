
const express = require('express');
const ExpressError = require('../expressError');

const router = new express.Router;
const items = require('../fakeDB');

//1. GET /items - this should render a list of shopping items.
router.get("/", function (req, res, next) {
    try {
        return res.status(200).json({ items });
    }
    catch (err) {
        next(err);
    }

});
//2. POST /items - this route should accept JSON data and add it to the shopping list.

router.post("/", function (req, res, next) {
    try {
        let newItem = { name: req.body.name, price: req.body.price }
        if (!newItem) {
            throw new ExpressError("Invalid item and/or price", 400);
        }
        items.push(newItem);
        return res.status(200).json({ item: newItem });
    }
    catch (err) {
        next(err);
    }

});

//3. GET /items/:name - this route should display a single item’s name and price.
router.get("/:name", function (req, res, next) {
    try {
        let foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item Not Found", 400);
        }
        return res.json({ foundItem })
    }
    catch (err) {
        next(err);
    }
});

//4. PATCH /items/:name, this route should modify a single item’s name and/or price.
router.patch("/:name", function (req, res, next) {
    try {
        let foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item Not Found", 400);
        }
        foundItem.name = req.body.name;
        foundItem.price = req.body.price;
        return res.json({ item: foundItem });
    }
    catch (err) {
        next(err);
    }

});

//5. DELETE /items/:name - this route should allow you to delete a specific item from the array.
router.delete("/:name", function (req, res, next) {

    let indx = items.findIndex(item => item.name === req.params.name);
    items.splice(indx, 1);
    return res.send({ message: "Deleted" });
});

module.exports = router;
