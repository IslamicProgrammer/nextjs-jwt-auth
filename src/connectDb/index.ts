import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Db connected!");
    });

    connection.on("error", () => {
      console.log("Connection error!");
      process.exit();
    });
  } catch (error) {
    console.log("Something went working while connecting to DB!");
    console.log(error);
  }
}
