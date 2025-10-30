import db from "#db/client.js";

export async function getAllPlaylists() {
  const result = await db.query("SELECT * FROM playlists");
  return result.rows;
}

export async function getPlaylistById(id) {
  const result = await db.query("SELECT * FROM playlists WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createPlaylist(name, description = "An empty playlist") {
  const result = await db.query(
    "INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return result.rows[0];
}

export async function getTracksInPlaylist(id) {
  const result = await db.query(
    "SELECT t.* FROM tracks t JOIN playlists_tracks pt ON t.id = pt.track_id WHERE pt.playlist_id = $1",
    [id]
  );
  return result.rows;
}
