import db from "#db/client.js";
import { createTrack } from "#db/queries/tracks.js";
import { createPlaylist } from "#db/queries/playlists.js";
import { addTrackToPlaylist } from "#db/queries/playlistsTracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  console.log("Creating tracks...");
  const tracks = [];
  for (let i = 1; i <= 20; i++) {
    const track = await createTrack(`Track ${i}`, 20000 + i * 1000);
    tracks.push(track);
  }

  console.log("Creating playlists...");
  const playlists = [];
  for (let i = 1; i <= 10; i++) {
    const playlist = await createPlaylist(
      `Playlist ${i}`,
      `Description for playlist ${i}`
    );
    playlists.push(playlist);
  }

  console.log("Creating playlist-track relationships...");
  for (let i = 0; i < 15; i++) {
    const playlist = playlists[i % playlists.length];
    const track = tracks[i];
    await addTrackToPlaylist(playlist.id, track.id);
  }
}
