import express from "express";

import { getAllTracks, getTrackById } from "#db/queries/tracks.js";

const router = express.Router();

//Get all tracks
router.get("/", async (req, res) => {
  try {
    const tracks = await getAllTracks();
    res.status(200).json(tracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid track ID" });
  }

  try {
    const track = await getTrackById(Number(id));
    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }
    res.status(200).json(track);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
