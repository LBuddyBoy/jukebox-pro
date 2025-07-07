import db from "#db/client";

export async function createPlaylist(name, description, owner_id) {
  const sql = `
  INSERT INTO playlists
    (name, description, owner_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description, owner_id]);
  return playlist;
}

export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getUsersPlaylists(owner_id) {
  const sql = `
  SELECT * FROM playlists
  WHERE owner_id = $1
  `;

  const { rows } = await db.query(sql, [owner_id]);

  return rows;
}

export async function getPlaylistsByTrackId(trackId, owner_id) {
  const sql = `
  SELECT playlists_tracks.*, playlists.*
    FROM playlists_tracks
  JOIN playlists ON playlists.id = playlists_tracks.playlist_id
    WHERE playlists_tracks.track_id = $1 
    AND playlists.owner_id = $2
  `;

  const { rows } = await db.query(sql, [trackId, owner_id]);

  return rows;
}
