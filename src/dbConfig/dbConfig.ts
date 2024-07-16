import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error ,make sure your Db is up and running : " + err
      );
      // process.exit(0);
    });
  } catch (error) {
    console.log("Something went wrong in Connecting to DB");
    console.log(error);
  }
}
