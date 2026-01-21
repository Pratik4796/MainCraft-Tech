import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection successful");
    });

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Internship_Task1",
    });
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
