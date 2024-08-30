const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/Post");

// Tạo bài đăng mới
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      user: req.user.id,
      title,
      content,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

// Lấy tất cả bài đăng
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "username");
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

// Lấy bài đăng theo ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!post) {
      return res.status(404).json({ msg: "Không tìm thấy bài đăng" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

// Cập nhật bài đăng
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Không tìm thấy bài đăng" });
    }
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Không có quyền chỉnh sửa bài đăng này" });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

// Xóa bài đăng
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Không tìm thấy bài đăng" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Không có quyền xóa bài đăng này" });
    }
    await post.remove();
    res.json({ msg: "Bài đăng đã được xóa" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

// Tìm kiếm và lọc bài đăng
router.get("/search", async (req, res) => {
  try {
    const { keyword, sortBy, order, limit = 10, page = 1 } = req.query;
    const query = keyword ? { title: { $regex: keyword, $options: "i" } } : {};
    const sort = {};
    if (sortBy) {
      sort[sortBy] = order === "desc" ? -1 : 1;
    }

    const posts = await Post.find(query)
      .sort(sort)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("user", "username");

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

module.exports = router;
