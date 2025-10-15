const express = require("express");
const connectDB = require("./config/config");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

let zzzRoute;
try {
  zzzRoute = require("./routes/index.route");
  console.log("✅ Đã load route thành công.");
} catch (err) {
  console.error("❌ Lỗi khi load index.route:", err.message);
}
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ZZZ API",
      version: "1.0.0",
      description: "API mô tả nhân vật trong ZZZ",
    },
  },
  apis: ["./routes/*.js"], // chỉ đến nơi chứa các route
};

connectDB();

const app = express();
const port = process.env.PORT || 5000;
const specs = swaggerJsdoc(options);

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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
});
