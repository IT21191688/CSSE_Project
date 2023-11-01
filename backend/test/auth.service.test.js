const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server'); // Import your Express app
const UserFactory = require('../factory/auth.factory');

const expect = chai.expect;
chai.use(chaiHttp);

describe('http://localhost:8080/auth', () => {
    // Connect to the MongoDB database before running any tests
    before(async () => {
        if (mongoose.connection.readyState === 0) {
            try {
                await mongoose.connect('mongodb+srv://sadeepa:sadeepa123@studentmanagement.in6etp1.mongodb.net/csse_db?retryWrites=true&w=majority', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.log("Connected to MongoDB");
            } catch (error) {
                console.error("Error connecting to MongoDB:", error);
            }
        }
    });
    // Disconnect from the database after all tests are finished
    after(async () => {
        await mongoose.disconnect();
    });

    it('should register a new user', async () => {
        const userData = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            age: '30',
            dob: '1993-01-15',
            password: 'password123',
            role: 'user',
        };

        const res = await chai
            .request(app)
            .post('/register')
            .send(userData);  // Pass the userData object

        console.log(res.body)

        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'User registered successfully');
    });

    it('should handle registration of an existing user', async () => {
        const userData = {
            firstname: 'Jane',
            lastname: 'Doe',
            email: 'jane.doe@example.com',
            age: '25',
            dob: '1998-05-10',
            password: 'password456',
            role: 'user',
        };

        await UserFactory.createUser(userData);

        const res = await chai.request(app)
            .post('/register')
            .send(userData);

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'User already exists');
    });

    it('should log in a user with valid credentials', async () => {
        const validUserCredentials = {
            email: 'alice@example.com',
            password: 'password789',
        };

        const res = await chai.request(app)
            .post('/login')
            .send(validUserCredentials);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('role', 'user');
    });

    it('should handle login with invalid email or password', async () => {
        const invalidUserCredentials = {
            email: 'nonexistent@example.com',
            password: 'incorrectPassword',
        };

        const res = await chai.request(app)
            .post('/login')
            .send(invalidUserCredentials);

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Invalid email or password');
    });
});
