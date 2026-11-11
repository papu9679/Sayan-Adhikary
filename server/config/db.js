import mongoose from 'mongoose';

// Connect to MongoDB with graceful fallback
async function initializeDatabase() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('✅ Connected successfully to MongoDB!');
	} catch (err) {
		console.log('❌ Connected failed');
		return;
	}
}

export default initializeDatabase;
