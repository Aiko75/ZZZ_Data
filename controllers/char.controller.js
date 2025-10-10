const charModel = require("../models/char.model");

exports.getCharacters = async (req, res) => {
  try {
    const { _id } = req.query; // 🧩 Lấy param từ query ?_id=...
    let characters;

    if (_id) {
      // 📌 Nếu có _id, tìm nhân vật theo ID
      characters = await charModel.findById(_id);

      if (!characters) {
        return res.status(404).json({
          success: false,
          message: `❌ Không tìm thấy nhân vật có _id = ${_id}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `✅ Lấy nhân vật có _id = ${_id} thành công`,
        data: characters,
      });
    }

    // 📋 Nếu không có _id, trả về toàn bộ danh sách
    characters = await charModel.find();

    res.status(200).json({
      success: true,
      count: characters.length,
      message: "✅ Lấy danh sách nhân vật thành công",
      data: characters,
    });
  } catch (err) {
    console.error("💥 Lỗi trong getCharacters:", err);

    res.status(500).json({
      success: false,
      message: "❌ Lỗi khi lấy danh sách nhân vật",
      errorDetail: err.message,
    });
  }
};

exports.postCharacter = async (req, res) => {
  try {
    const newCharacter = new charModel(req.body);
    const saved = await newCharacter.save();
    res.status(201).json({
      success: true,
      message: "✅ Đã thêm nhân vật mới thành công",
      data: saved,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "❌ Thêm nhân vật thất bại",
      errorDetail: err.message,
    });
  }
};

exports.postManyCharacters = async (req, res) => {
  try {
    const characters = req.body; // mảng gồm 49 nhân vật
    const result = await charModel.insertMany(characters);
    res.status(201).json({
      success: true,
      message: `✅ Đã lưu ${result.length} nhân vật.`,
      count: result.length,
      data: result,
    });
  } catch (err) {
    console.error("❌ Lỗi khi insertMany:", err);
    res.status(500).json({
      success: false,
      message: "❌ Insert nhiều nhân vật thất bại",
      errorDetail: err.message,
    });
  }
};

exports.putManyCharacters = async (req, res) => {
  try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        message: "❌ Body phải là một mảng nhân vật",
      });
    }

    const bulkOps = updates.map((char) => ({
      updateOne: {
        filter: { name: char.name },
        update: { $set: char },
        upsert: true,
      },
    }));

    const result = await charModel.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: "✅ Đã cập nhật thành công nhiều nhân vật",
      summary: {
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount,
      },
      data: result.result, // chứa raw detail
    });
  } catch (err) {
    console.error("❌ Lỗi batch update:", err);
    res.status(500).json({
      success: false,
      message: "❌ Lỗi server khi batch update",
      errorDetail: err.message,
    });
  }
};
