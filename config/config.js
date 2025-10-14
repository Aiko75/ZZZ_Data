const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "zzz",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối MongoDB thành công!");
  } catch (err) {
    console.error("Kết nối MongoDB thất bại:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
