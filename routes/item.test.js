process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDB");


let newItem = { name: "ketchup", price: 4.99 }

beforeEach(async () => {
    items.push(newItem);
})

afterEach(async () => {
    items = [];
});

// Get all items 
describe("GET all items", function () {
    test("get a list of all items", async function () {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ "items": [{ "name": "ketchup", "price": 4.99 }] });
    })
})
describe("GET an items", function () {
    test("get one item", async function () {
        const res = await request(app).get(`/items/${newItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.foundItem).toEqual({ "name": "ketchup", "price": 4.99 });
    });
});
//Post new item
describe("POST an item", function () {
    test("post a new item", async function () {
        const res = await request(app)
            .post(`/items`)
            .send({
                name: "Mustard",
                price: 3.79
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({ "name": "Mustard", "price": 3.79 });
    });
});

//Patch & Update item
describe("UPDATE/ PATCH an item", function () {
    test("update an item", async function () {
        const res = await request(app)
            .patch(`/items/${newItem.name}`)
            .send({
                name: "New Ketchup",
                price: 8.99
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({ "name": "New Ketchup", "price": 8.99 });
    });
    test("Responds with 404 if can't find item", async function () {
        const response = await request(app).patch(`/items/milk`);
        expect(response.statusCode).toBe(400);
    });
});

//Delete an item
describe("DELETE an item", function () {
    test("Deletes a single a item", async function () {
        const res = await request(app)
            .delete(`/items/${newItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
});