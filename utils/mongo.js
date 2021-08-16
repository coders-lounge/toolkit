import mongoose from 'mongoose';
import 'dotenv/config';

export default async () => {
	await mongoose.connect(process.env.DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
	return mongoose;
};
