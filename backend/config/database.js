const mongoose = require('mongoose');
const { MONGODB_URL } = process.env; // You can load this from your .env file

//used to singleton
class Database {
    constructor() {
        this.isConnected = false;
    }

    async connect() {
        if (this.isConnected) {
            return;
        }

        try {
            await mongoose.connect(MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            this.isConnected = true;
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    disconnect() {
        if (this.isConnected) {
            mongoose.disconnect();
            this.isConnected = false;
            console.log('Disconnected from MongoDB');
        }
    }
}

const database = new Database();
module.exports = database;
