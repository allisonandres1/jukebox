import db from "#db/client.js";

export async function getPlaylistTrack(playlistId, trackId) {
  const result = await db.query(
    "SELECT * FROM playlists_tracks WHERE playlist_id=$1 AND track_id=$2",
    [playlistId, trackId]
  );
  return result.rows[0];
}

export async function addTrackToPlaylist(playlistId, trackId) {
  const result = await db.query(
    "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2) RETURNING *",
    [playlistId, trackId]
  );
  return result.rows[0];
}
