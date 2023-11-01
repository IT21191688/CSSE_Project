const request = require('supertest');
const app = require('../server');

describe('http://localhost:8080/payment', () => {
    let paymentId; // Store the ID of the created payment for subsequent tests

    // Test creating a payment
    it('should create a new payment', async () => {
        const res = await request(app)
            .post('/createPayment')
            .send({
                amount: '100.00',
                orderid: '12345',
                cardno: '**** **** **** 1234',
                date: '2023-01-01',
                paymentstatus: 'Paid',
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        paymentId = res.body._id; // Store the ID for future tests
    });

    // Test fetching all payments
    it('should get all payments', async () => {
        const res = await request(app).get('/getAllPayments');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Test fetching a specific payment by ID
    it('should get a payment by ID', async () => {
        const res = await request(app).get(`/getOnePayment/${paymentId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', paymentId);
    });

    // Test updating a payment
    it('should update a payment', async () => {
        const updatedAmount = '200.00';
        const res = await request(app)
            .put(`/updatePayment/${paymentId}`)
            .send({ amount: updatedAmount });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('amount', updatedAmount);
    });

    // Test updating a payment that doesn't exist
    it('should fail to update a non-existent payment', async () => {
        const nonExistentPaymentId = 'nonExistentId';
        const updatedAmount = '200.00';
        const res = await request(app)
            .put(`/updatePayment/${nonExistentPaymentId}`)
            .send({ amount: updatedAmount });
        expect(res.statusCode).toBe(404);
        // You can add more specific error response checks here.
    });

    // Test deleting a payment
    it('should delete a payment', async () => {
        const res = await request(app).delete(`/deletePayment/${paymentId}`);
        expect(res.statusCode).toBe(204);
    });

    // Test deleting a payment that doesn't exist
    it('should fail to delete a non-existent payment', async () => {
        const nonExistentPaymentId = 'nonExistentId';
        const res = await request(app).delete(`/deletePayment/${nonExistentPaymentId}`);
        console.log(res)
        expect(res.statusCode).toBe(404);
        // You can add more specific error response checks here.
    });
});
