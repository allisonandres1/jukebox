import express from "express";
import playlistRouter from "#routes/playlist.js";
import tracksRouter from "#routes/tracks.js";

const app = express();
app.use(express.json());

app.use("/playlist", playlistRouter);
app.use("/tracks", tracksRouter);

export default app;
