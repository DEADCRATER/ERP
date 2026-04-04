import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const MongoUrl = "mongodb+srv://bhavesh:bhavesh2026@erp.azkiqe1.mongodb.net/ERP?retryWrites=true&w=majority";

const email = 'superadmin@erp.com';
const password = '123456';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MongoUrl);

    // Check if super admin exists
    const existingAdmin = await User.findOne({ email });

    if (!existingAdmin) {
      // Hash password

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const superAdmin = new User({
        name: 'Super Admin',
        email,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
      });

      await superAdmin.save();
      console.log("✅ Super Admin created");
    } else {
      console.log("ℹ️ Super Admin already exists");
    }

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;