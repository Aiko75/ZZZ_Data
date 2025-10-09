exports.getImageCharacters = async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send("❌ Missing URL");

  try {
    console.log("🔁 Proxying image:", imageUrl);

    const response = await fetch(imageUrl, {
      headers: {
        // 🔥 Quan trọng: giả làm trình duyệt thật
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        Accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://static.wikia.nocookie.net/",
      },
    });

    if (!response.ok) {
      console.error(
        "❌ Proxy fetch failed:",
        response.status,
        response.statusText
      );
      return res.status(response.status).send("❌ Failed to fetch image");
    }

    // Lấy định dạng ảnh thật
    const contentType = response.headers.get("content-type");
    res.set("Content-Type", contentType);
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("❌ Proxy error:", err.message);
    res.status(500).send("❌ Proxy internal error");
  }
};
