import express from "express";
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  getTracksInPlaylist,
} from "#db/queries/playlists.js";

import {
  addTrackToPlaylist,
  getPlaylistTrack,
} from "#db/queries/playlistsTracks.js";
import { getTrackById } from "#db/queries/tracks.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const playlists = await getAllPlaylists();
    res.status(200).json(playlists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body || {};

  if (!name) {
    return res.status(400).json({ error: "Playlist name is required" });
  }

  try {
    const playlist = await createPlaylist(name);
    res.status(201).json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  try {
    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id/tracks", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  try {
    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const tracks = await getTracksInPlaylist(id);
    res.json(tracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:id/tracks", async (req, res) => {
  try {
    const playlistId = parseInt(req.params.id);
    if (isNaN(playlistId)) {
      return res.status(400).json({ error: "Playlist ID must be a number" });
    }

    const { trackId } = req.body || {};
    const parsedTrackId = parseInt(trackId);
    if (!parsedTrackId || isNaN(parsedTrackId)) {
      return res.status(400).json({ error: "trackId must be a number" });
    }

    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const trackExists = await getTrackById(parsedTrackId);
    if (!trackExists) {
      return res.status(400).json({ error: "Track does not exist" });
    }

    const existingTrack = await getPlaylistTrack(playlistId, parsedTrackId);
    if (existingTrack) {
      return res.status(400).json({ error: "Track already in playlist" });
    }

    const newTrack = await addTrackToPlaylist(playlistId, parsedTrackId);
    return res.status(201).json(newTrack);
  } catch (err) {
    console.error("Error adding track to playlist:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
