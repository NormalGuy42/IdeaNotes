import User from "@/lib/models/User";

const mongoose = require("mongoose");

async function connectToMongoDB() {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
        
        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

async function runMigrations() {
    try {
        await connectToMongoDB();
        
        // Get all users
        const users = await User.find({});
        
        // Migrate each user
        for (const user of users) {
            const updates: any = {};
            
            // Initialize categories if doesn't exist
            if (!user.categories) {
                updates.categories = [];
            }
            
            // Initialize ideas array if doesn't exist
            if (!user.ideas) {
                updates.ideas = [];
            }

            // Only update if there are changes needed
            if (Object.keys(updates).length > 0) {
                console.log(`Migrating user: ${user.id}`);
                await User.findOneAndUpdate(
                    { id: user.id },
                    { $set: updates },
                    { new: true }
                );
            }
        }
        
        console.log('Migration completed successfully');
        
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
        throw error;
    } finally {
        // Close the connection
        await mongoose.connection.close();
    }
}

runMigrations();