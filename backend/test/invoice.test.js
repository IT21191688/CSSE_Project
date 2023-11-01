const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../src/App'); // Assuming your Express app is defined in this file
const Invoice = require('../models/invoice.model');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Invoice API Tests', () => {
  before(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/testDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the Invoice collection before each test
    await Invoice.deleteMany({});
  });

  describe('POST /createInvoice', () => {
    it('should create a new invoice', async () => {
      const invoiceData = {
        ordername: 'Test Order',
        ordertotal: 100,
        orderstatus: 'Pending',
        actualprice: '90',
      };

      const res = await chai
        .request(app)
        .post('/createInvoice')
        .send(invoiceData);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.ordername).to.equal('Test Order');
    });
  });

  describe('GET /getAllInvoices', () => {
    it('should get all invoices', async () => {
      // Create some test invoices before testing
      const testInvoices = [
        {
          ordername: 'Invoice 1',
          ordertotal: 50,
          orderstatus: 'Paid',
          actualprice: '50',
        },
        // Add more test invoices as needed
      ];
      await Invoice.create(testInvoices);

      const res = await chai.request(app).get('/getAllInvoices');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(testInvoices.length);
    });
  });

  // Add similar test cases for other routes (GET /getOneInvoice, PUT /updateInvoice, DELETE /deleteInvoice)
});
