import db from "#db/client.js";

export async function createTrack(name, duration_ms) {
  const result = await db.query(
    `INSERT INTO tracks (name, duration_ms)
     VALUES ($1, $2)
     RETURNING *`,
    [name, duration_ms]
  );
  return result.rows[0];
}

export async function getAllTracks() {
  const result = await db.query("SELECT * FROM tracks");
  return result.rows;
}

export async function getTrackById(id) {
  const result = await db.query("SELECT * FROM tracks WHERE id = $1", [id]);
  return result.rows[0];
}
