const request = require('supertest');
const app = require('../app'); // Replace with the path to your Express app

describe('Inventory API Endpoints', () => {
    let inventoryId; // Store the ID of the created inventory item for subsequent tests

    // Test creating a inventory
    it('should create a new inventory', async () => {
        const res = await request(app)
            .post('/createInventory')
            .send({
                name: 'Sample Product',
                quantity: 10,
                avgunitprice: 50.0
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        inventoryId = res.body._id; // Store the ID for future tests
    });

    // Test fetching all inventory
    it('should get all inventory', async () => {
        const res = await request(app).get('/getAllInventory');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test deleting a payment
    it('should delete an inventory item', async () => {
        const res = await request(app).delete(`/deleteInventory/${inventoryId}`);
        expect(res.statusCode).toBe(204);
    });
});
