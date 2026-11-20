import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const imageBase = "/booking/ivanjicki-konaci/images";
export const bookingListingUrl = site.bookingUrl;

const baseCabins = [
  {
    slug: "superior-porodicna-soba",
    bookingRoomId: "114038401",
    bookingUrl: `${bookingListingUrl}#room_114038401`,
    image: `${imageBase}/superior-porodicna-soba-04-370802556.jpg`,
    size: "42 m²",
    maxOccupancy: 5,
    images: [
      `${imageBase}/superior-porodicna-soba-04-370802556.jpg`,
      `${imageBase}/superior-porodicna-soba-06-370803913.jpg`,
      `${imageBase}/superior-porodicna-soba-05-370802874.jpg`,
      `${imageBase}/superior-porodicna-soba-01-370801753.jpg`,
      `${imageBase}/superior-porodicna-soba-02-370802176.jpg`,
      `${imageBase}/superior-porodicna-soba-03-370802357.jpg`,
    ],
    translations: {
      sr: {
        name: "Superior porodična soba",
        beds: [
          "1 krevet za 1 osobu",
          "1 ekstra veliki bračni krevet",
          "1 veliki bračni krevet",
        ],
        facilities: [
          "pogled na vrt",
          "pogled na bazen",
          "pogled na planinu",
          "pogled na unutrašnje dvorište",
          "klima-uređaj",
          "popločano dvorište",
          "sopstveno kupatilo",
          "flat-screen TV",
          "zvučna izolacija",
          "terasa",
          "konzola za igrice - Nintendo Wii",
        ],
        description:
          "Porodična soba od 42 m² za do 5 gostiju, sa terasom, sopstvenim kupatilom, flat-screen TV-om, klimom, zvučnom izolacijom i pogledom na vrt, bazen, planinu i unutrašnje dvorište.",
      },
      en: {
        name: "Superior Family Room",
        beds: [
          "1 single bed",
          "1 extra-large double bed",
          "1 large double bed",
        ],
        facilities: [
          "garden view",
          "pool view",
          "mountain view",
          "inner courtyard view",
          "air conditioning",
          "patio",
          "private bathroom",
          "flat-screen TV",
          "soundproofing",
          "terrace",
          "Nintendo Wii game console",
        ],
        description:
          "A 42 m² family room for up to 5 guests, with a terrace, private bathroom, flat-screen TV, air conditioning, soundproofing and views of the garden, pool, mountain and inner courtyard.",
      },
    },
  },
  {
    slug: "studio-sa-sofom-na-izvlacenje",
    bookingRoomId: "114038402",
    bookingUrl: `${bookingListingUrl}#room_114038402`,
    image: `${imageBase}/studio-sa-sofom-na-izvlacenje-01-368343781.jpg`,
    size: "34 m²",
    maxOccupancy: 4,
    images: [
      `${imageBase}/studio-sa-sofom-na-izvlacenje-01-368343781.jpg`,
      `${imageBase}/studio-sa-sofom-na-izvlacenje-02-368344076.jpg`,
      `${imageBase}/studio-sa-sofom-na-izvlacenje-03-368345010.jpg`,
      `${imageBase}/studio-sa-sofom-na-izvlacenje-04-423529430.jpg`,
    ],
    translations: {
      sr: {
        name: "Studio sa sofom na izvlačenje",
        beds: ["2 kreveta za 1 osobu", "1 veliki bračni krevet"],
        facilities: [
          "čajna kuhinja",
          "sopstveno kupatilo",
          "pogled na vrt",
          "pogled na bazen",
          "pogled na planinu",
          "pogled na unutrašnje dvorište",
          "klima-uređaj",
          "popločano dvorište",
          "flat-screen TV",
          "zvučna izolacija",
          "terasa",
          "konzola za igrice - Nintendo Wii",
        ],
        description:
          "Studio od 34 m² za do 4 gosta, sa čajnom kuhinjom, terasom, sopstvenim kupatilom, flat-screen TV-om, klimom, zvučnom izolacijom i pogledom na vrt, bazen, planinu i unutrašnje dvorište.",
      },
      en: {
        name: "Studio with Sofa Bed",
        beds: ["2 single beds", "1 large double bed"],
        facilities: [
          "kitchenette",
          "private bathroom",
          "garden view",
          "pool view",
          "mountain view",
          "inner courtyard view",
          "air conditioning",
          "patio",
          "flat-screen TV",
          "soundproofing",
          "terrace",
          "Nintendo Wii game console",
        ],
        description:
          "A 34 m² studio for up to 4 guests, with a kitchenette, terrace, private bathroom, flat-screen TV, air conditioning, soundproofing and views of the garden, pool, mountain and inner courtyard.",
      },
    },
  },
  {
    slug: "dvokrevetna-soba-sa-bracnim-krevetom-i-terasom",
    bookingRoomId: "114038406",
    bookingUrl: `${bookingListingUrl}#room_114038406`,
    image: `${imageBase}/dvokrevetna-soba-sa-bracnim-krevetom-i-terasom-03-368348168.jpg`,
    size: "35 m²",
    maxOccupancy: 2,
    images: [
      `${imageBase}/dvokrevetna-soba-sa-bracnim-krevetom-i-terasom-03-368348168.jpg`,
      `${imageBase}/dvokrevetna-soba-sa-bracnim-krevetom-i-terasom-04-368348458.jpg`,
      `${imageBase}/dvokrevetna-soba-sa-bracnim-krevetom-i-terasom-02-368347876.jpg`,
      `${imageBase}/dvokrevetna-soba-sa-bracnim-krevetom-i-terasom-01-368562198.jpg`,
    ],
    translations: {
      sr: {
        name: "Dvokrevetna soba sa bračnim krevetom i terasom",
        beds: ["1 veliki bračni krevet"],
        facilities: [
          "pogled na vrt",
          "pogled na bazen",
          "pogled na planinu",
          "pogled na unutrašnje dvorište",
          "klima-uređaj",
          "popločano dvorište",
          "sopstveno kupatilo",
          "flat-screen TV",
          "zvučna izolacija",
          "terasa",
          "mini-bar",
          "konzola za igrice - Nintendo Wii",
        ],
        description:
          "Dvokrevetna soba od 35 m² za do 2 gosta, sa velikim bračnim krevetom, terasom, mini-barom, sopstvenim kupatilom, flat-screen TV-om, klimom i pogledom na vrt, bazen, planinu i unutrašnje dvorište.",
      },
      en: {
        name: "Double Room with Double Bed and Terrace",
        beds: ["1 large double bed"],
        facilities: [
          "garden view",
          "pool view",
          "mountain view",
          "inner courtyard view",
          "air conditioning",
          "patio",
          "private bathroom",
          "flat-screen TV",
          "soundproofing",
          "terrace",
          "mini-bar",
          "Nintendo Wii game console",
        ],
        description:
          "A 35 m² double room for up to 2 guests, with a large double bed, terrace, mini-bar, private bathroom, flat-screen TV, air conditioning and views of the garden, pool, mountain and inner courtyard.",
      },
    },
  },
  {
    slug: "deluks-trokrevetna-soba",
    bookingRoomId: "114038407",
    bookingUrl: `${bookingListingUrl}#room_114038407`,
    image: `${imageBase}/deluks-trokrevetna-soba-03-368561955.jpg`,
    size: "25 m²",
    maxOccupancy: 3,
    images: [
      `${imageBase}/deluks-trokrevetna-soba-03-368561955.jpg`,
      `${imageBase}/deluks-trokrevetna-soba-01-368349565.jpg`,
      `${imageBase}/deluks-trokrevetna-soba-02-368349960.jpg`,
      `${imageBase}/deluks-trokrevetna-soba-04-368562198.jpg`,
    ],
    translations: {
      sr: {
        name: "Deluks trokrevetna soba",
        beds: ["1 krevet za 1 osobu", "1 veliki bračni krevet"],
        facilities: [
          "pogled na vrt",
          "pogled na planinu",
          "klima-uređaj",
          "popločano dvorište",
          "sopstveno kupatilo",
          "flat-screen TV",
          "zvučna izolacija",
          "konzola za igrice - Nintendo Wii",
        ],
        description:
          "Deluks trokrevetna soba od 25 m² za do 3 gosta, sa jednim krevetom za 1 osobu i jednim velikim bračnim krevetom, sopstvenim kupatilom, flat-screen TV-om, klimom, zvučnom izolacijom i pogledom na vrt i planinu.",
      },
      en: {
        name: "Deluxe Triple Room",
        beds: ["1 single bed", "1 large double bed"],
        facilities: [
          "garden view",
          "mountain view",
          "air conditioning",
          "patio",
          "private bathroom",
          "flat-screen TV",
          "soundproofing",
          "Nintendo Wii game console",
        ],
        description:
          "A 25 m² deluxe triple room for up to 3 guests, with one single bed and one large double bed, a private bathroom, flat-screen TV, air conditioning, soundproofing and views of the garden and mountain.",
      },
    },
  },
  {
    slug: "trokrevetna-soba-sa-terasom",
    bookingRoomId: "114038408",
    bookingUrl: `${bookingListingUrl}#room_114038408`,
    image: `${imageBase}/trokrevetna-soba-sa-terasom-04-368563040.jpg`,
    size: "35 m²",
    maxOccupancy: 3,
    images: [
      `${imageBase}/trokrevetna-soba-sa-terasom-04-368563040.jpg`,
      `${imageBase}/trokrevetna-soba-sa-terasom-05-368348458.jpg`,
      `${imageBase}/trokrevetna-soba-sa-terasom-03-368561955.jpg`,
      `${imageBase}/trokrevetna-soba-sa-terasom-02-69630816.jpg`,
      `${imageBase}/trokrevetna-soba-sa-terasom-01-368562198.jpg`,
    ],
    translations: {
      sr: {
        name: "Trokrevetna soba sa terasom",
        beds: ["1 krevet za 1 osobu", "1 veliki bračni krevet"],
        facilities: [
          "pogled na vrt",
          "pogled na bazen",
          "pogled na planinu",
          "pogled na unutrašnje dvorište",
          "klima-uređaj",
          "popločano dvorište",
          "sopstveno kupatilo",
          "flat-screen TV",
          "zvučna izolacija",
          "terasa",
          "mini-bar",
          "konzola za igrice - Nintendo Wii",
        ],
        description:
          "Trokrevetna soba od 35 m² za do 3 gosta, sa terasom, mini-barom, sopstvenim kupatilom, flat-screen TV-om, klimom, zvučnom izolacijom i pogledom na vrt, bazen, planinu i unutrašnje dvorište.",
      },
      en: {
        name: "Triple Room with Terrace",
        beds: ["1 single bed", "1 large double bed"],
        facilities: [
          "garden view",
          "pool view",
          "mountain view",
          "inner courtyard view",
          "air conditioning",
          "patio",
          "private bathroom",
          "flat-screen TV",
          "soundproofing",
          "terrace",
          "mini-bar",
          "Nintendo Wii game console",
        ],
        description:
          "A 35 m² triple room for up to 3 guests, with a terrace, mini-bar, private bathroom, flat-screen TV, air conditioning, soundproofing and views of the garden, pool, mountain and inner courtyard.",
      },
    },
  },
  {
    slug: "deluks-dvokrevetna-soba-sa-bracnim-krevetom",
    bookingRoomId: "114038410",
    bookingUrl: `${bookingListingUrl}#room_114038410`,
    image: `${imageBase}/deluks-dvokrevetna-soba-sa-bracnim-krevetom-02-368349309.jpg`,
    size: "25 m²",
    maxOccupancy: 2,
    images: [
      `${imageBase}/deluks-dvokrevetna-soba-sa-bracnim-krevetom-02-368349309.jpg`,
      `${imageBase}/deluks-dvokrevetna-soba-sa-bracnim-krevetom-03-368348734.jpg`,
      `${imageBase}/deluks-dvokrevetna-soba-sa-bracnim-krevetom-01-368352534.jpg`,
      `${imageBase}/deluks-dvokrevetna-soba-sa-bracnim-krevetom-04-368562198.jpg`,
    ],
    translations: {
      sr: {
        name: "Deluks dvokrevetna soba sa bračnim krevetom",
        beds: ["1 veliki bračni krevet"],
        facilities: [
          "pogled na vrt",
          "pogled na bazen",
          "pogled na planinu",
          "pogled na unutrašnje dvorište",
          "klima-uređaj",
          "popločano dvorište",
          "sopstveno kupatilo",
          "flat-screen TV",
          "zvučna izolacija",
          "konzola za igrice - Nintendo Wii",
        ],
        description:
          "Deluks dvokrevetna soba od 25 m² za do 2 gosta, sa velikim bračnim krevetom, sopstvenim kupatilom, flat-screen TV-om, klimom, zvučnom izolacijom i pogledom na vrt, bazen, planinu i unutrašnje dvorište.",
      },
      en: {
        name: "Deluxe Double Room with Double Bed",
        beds: ["1 large double bed"],
        facilities: [
          "garden view",
          "pool view",
          "mountain view",
          "inner courtyard view",
          "air conditioning",
          "patio",
          "private bathroom",
          "flat-screen TV",
          "soundproofing",
          "Nintendo Wii game console",
        ],
        description:
          "A 25 m² deluxe double room for up to 2 guests, with a large double bed, private bathroom, flat-screen TV, air conditioning, soundproofing and views of the garden, pool, mountain and inner courtyard.",
      },
    },
  },
] as const;

export function getCabins(locale: Locale = "sr") {
  return baseCabins.map((cabin) => {
    const translation = cabin.translations[locale];

    return {
      slug: cabin.slug,
      bookingUrl: cabin.bookingUrl,
      image: cabin.image,
      images: [...cabin.images],
      size: cabin.size,
      sizeM2: Number.parseInt(cabin.size, 10),
      maxOccupancy: cabin.maxOccupancy,
      name: translation.name,
      beds: [...translation.beds],
      facilities: [...translation.facilities],
    };
  });
}

export type Cabin = ReturnType<typeof getCabins>[number];
