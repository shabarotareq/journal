const express = require("express");
const router = express.Router();
const { Slide, Media } = require("../models/Side");

// GET جميع الشرائح
router.get("/", async (req, res) => {
  const slides = await Slide.findAll({ include: "media" });
  res.json(slides);
});

// GET شريحة محددة
router.get("/:id", async (req, res) => {
  const slide = await Slide.findByPk(req.params.id, { include: "media" });
  if (!slide) return res.status(404).json({ error: "Slide not found" });
  res.json(slide);
});

// POST شريحة جديدة
router.post("/", async (req, res) => {
  const { title, subtitle, textContent, media } = req.body;
  const newSlide = await Slide.create({ title, subtitle, textContent });
  if (media && media.length > 0) {
    for (let m of media) {
      await newSlide.createMedia(m);
    }
  }
  res.json(newSlide);
});

module.exports = router;
