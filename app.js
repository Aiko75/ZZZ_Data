const express = require("express");
const connectDB = require("./config/config");
const cors = require("cors");

let zzzRoute;
try {
  zzzRoute = require("./routes/index.route");
  console.log("✅ Đã load route thành công.");
} catch (err) {
  console.error("❌ Lỗi khi load index.route:", err.message);
}

connectDB();

const app = express();
const port = process.env.PORT || 5000;

// // ✅ Bật CORS cho tất cả request
// app.use(cors());

// Nếu muốn chỉ cho phép frontend cụ thể (VD: localhost:5174)
app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

// ✅ Middleware parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Route API chính
app.use("/api/zzz", zzzRoute);

// ✅ Route gốc để test
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ZZZ API 🚀" });
});

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
});
