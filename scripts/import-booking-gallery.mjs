import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { basename, join } from "node:path";
import { pipeline } from "node:stream/promises";

const sourcePath = "scripts/import-sources/ivanjicki-konaci/annu-hotel.html";
const imageDir = "public/booking/ivanjicki-konaci/gallery";
const manifestPath = "public/booking/ivanjicki-konaci/gallery-manifest.json";
const dataPath = "src/data/gallery.ts";

function extractJsonScript(html, type) {
  const scripts = html.match(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi
  );

  const script = scripts?.find((candidate) => candidate.includes(`"@type": "${type}"`));
  if (!script) {
    throw new Error(`Cannot find ${type} JSON-LD script.`);
  }

  return JSON.parse(
    script
      .replace(/^<script[^>]*>/i, "")
      .replace(/<\/script>$/i, "")
      .trim()
  );
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
const lodging = extractJsonScript(html, "LodgingBusiness");
const imageUrls = [...new Set(lodging.image ?? [])];

await mkdir(imageDir, { recursive: true });

const images = [];
let downloaded = 0;
let skipped = 0;

for (const [index, originalUrl] of imageUrls.entries()) {
  const id = imageId(originalUrl);
  const fileName = `booking-galerija-${String(index + 1).padStart(2, "0")}-${id}.jpg`;
  const localPath = join(imageDir, fileName);
  const status = await download(originalUrl, localPath);

  if (status === "downloaded") downloaded += 1;
  if (status === "skipped") skipped += 1;

  images.push({
    id,
    originalUrl,
    localPath: `/booking/ivanjicki-konaci/gallery/${fileName}`,
    alt: `Ivanjicki Konaci - Booking gallery ${index + 1}`,
  });
}

await writeFile(
  manifestPath,
  `${JSON.stringify(
    {
      source: "https://www.booking.com/hotel/rs/apartments-ivanjicki-konaci.sr.html?activeTab=photosGallery",
      mirrorSource: "https://sr.annu-hotel.com/rs/lux-smestaj-ivanjicki-konaci-38579.html",
      generatedAt: new Date().toISOString(),
      images,
    },
    null,
    2
  )}\n`
);

await writeFile(
  dataPath,
  `import type { Locale } from "@/lib/i18n";

export const galleryImages = ${JSON.stringify(
    images.map(({ localPath, alt }) => ({ src: localPath, alt })),
    null,
    2
  )};

export function getGalleryImages(locale: Locale = "sr") {
  return galleryImages.map((image, index) => ({
    src: image.src,
    alt:
      locale === "sr"
        ? \`Ivanjički Konaci - Booking galerija \${index + 1}\`
        : \`Ivanjicki Konaci - Booking gallery \${index + 1}\`,
  }));
}
`
);

console.log(
  `Imported ${images.length} gallery images, ${downloaded} downloaded, ${skipped} skipped.`
);
