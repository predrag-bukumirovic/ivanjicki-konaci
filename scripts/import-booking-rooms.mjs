import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { basename, join } from "node:path";
import { pipeline } from "node:stream/promises";

const sourcePath = "scripts/import-sources/ivanjicki-konaci/annu-hotel.html";
const imageDir = "public/booking/ivanjicki-konaci/images";
const manifestPath = "public/booking/ivanjicki-konaci/rooms-manifest.json";

function extractRawData(html) {
  const marker = "const rawData = ";
  const start = html.indexOf(marker);
  if (start === -1) {
    throw new Error("Cannot find rawData in source HTML.");
  }

  const arrayStart = html.indexOf("[", start + marker.length);
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = arrayStart; i < html.length; i += 1) {
    const char = html[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
    } else if (char === "[") {
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return JSON.parse(html.slice(arrayStart, i + 1));
      }
    }
  }

  throw new Error("rawData array is not closed.");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replaceAll("đ", "dj")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function imageId(url) {
  const match = url.match(/\/(\d+)\.jpg/i);
  return match?.[1] ?? basename(new URL(url).pathname, ".jpg");
}

async function exists(path) {
  try {
    const file = await stat(path);
    return file.size > 0;
  } catch {
    return false;
  }
}

async function download(url, path) {
  if (await exists(path)) {
    return "skipped";
  }

  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; IvanjickiKonaciSiteImport/1.0)",
    },
  });

  if (!response.ok || !response.body) {
    throw new Error(`Download failed ${response.status} for ${url}`);
  }

  await pipeline(response.body, createWriteStream(path));
  return "downloaded";
}

const html = await readFile(sourcePath, "utf8");
const rawRooms = extractRawData(html);
await mkdir(imageDir, { recursive: true });

const rooms = [];
let downloaded = 0;
let skipped = 0;

for (const room of rawRooms) {
  const slug = slugify(room.roomName);
  const sizeNumber = room.roomSize.match(/\d+/)?.[0] ?? "";

  const photos = [];
  for (const [index, originalUrl] of room.photos.entries()) {
    const id = imageId(originalUrl);
    const fileName = `${slug}-${String(index + 1).padStart(2, "0")}-${id}.jpg`;
    const localPath = join(imageDir, fileName);
    const status = await download(originalUrl, localPath);
    if (status === "downloaded") downloaded += 1;
    if (status === "skipped") skipped += 1;

    photos.push({
      originalUrl,
      localPath: `/booking/ivanjicki-konaci/images/${fileName}`,
      id,
    });
  }

  rooms.push({
    slug,
    name: room.roomName,
    size: sizeNumber ? `${sizeNumber} m²` : room.roomSize,
    maxOccupancy: room.maxOccupancy,
    beds: room.beds.map((bed) => bed.label),
    facilities: room.facilities,
    photos,
  });
}

await writeFile(
  manifestPath,
  `${JSON.stringify(
    {
      source: "https://sr.annu-hotel.com/rs/lux-smestaj-ivanjicki-konaci-38579.html",
      generatedAt: new Date().toISOString(),
      rooms,
    },
    null,
    2
  )}\n`
);

console.log(
  `Imported ${rooms.length} rooms, ${downloaded} images downloaded, ${skipped} images skipped.`
);
