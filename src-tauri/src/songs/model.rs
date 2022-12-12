use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

pub enum SongSource {
    Youtube,
    NetEase,
    Locale,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Artist {
    pub id: u64,
    pub name: String,
    pub avatar: String,
}

impl Artist {
    pub fn from_json(json: &str) -> Option<Self> {
        if let Ok(value) = serde_json::from_str::<Value>(json) {
            return Some(Artist {
                id: value["id"].as_u64()?,
                name: value["name"].as_str()?.to_string(),
                avatar: value["avatar"].as_str()?.to_string(),
            });
        }
        None
    }

    pub fn to_json(&self) -> Option<String> {
        if let Ok(value) = serde_json::to_string(&json!({
            "id": self.id,
            "name": self.name,
            "avatar": self.avatar,
        })) {
            return Some(value);
        }
        None
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Album {
    pub id: u64,
    pub name: String,
    pub cover: String,
    pub artist: Artist,
}

impl Album {
    pub fn from_json(json: &str) -> Option<Self> {
        if let Ok(value) = serde_json::from_str::<Value>(json) {
            return Some(Album {
                id: value["id"].as_u64()?,
                name: value["name"].as_str()?.to_string(),
                cover: value["cover"].as_str()?.to_string(),
                artist: Artist::from_json(value["artist"].as_str()?)?,
            });
        }
        None
    }

    pub fn to_json(&self) -> Option<String> {
        if let Ok(value) = serde_json::to_string(&json!({
            "id": self.id,
            "name": self.name,
            "cover": self.cover,
            "artist": self.artist.to_json()?,
        })) {
            return Some(value);
        }
        None
    }
}

pub struct Song {
    pub id: u64,
    pub title: String,
    pub artist: Artist,
    pub album: Album,
    pub duration: u64,
    pub url: String,
    pub source: SongSource,
}

impl Song {
    pub fn from_json(json: &str) -> Option<Self> {
        if let Ok(value) = serde_json::from_str::<Value>(json) {
            return Some(Song {
                id: value["id"].as_u64()?,
                title: value["title"].as_str()?.to_string(),
                artist: Artist::from_json(value["artist"].as_str()?)?,
                album: Album::from_json(value["album"].as_str()?)?,
                duration: value["duration"].as_u64()?,
                url: value["url"].as_str()?.to_string(),
                source: SongSource::Youtube,
            });
        }

        None
    }

    pub fn to_json(&self) -> Option<String> {
        if let Ok(value) = serde_json::to_string(&json!({
            "id": self.id,
            "title": self.title,
            "artist": self.artist.to_json()?,
            "album": self.album.to_json()?,
            "duration": self.duration,
            "url": self.url,
        })) {
            return Some(value);
        }

        None
    }
}
