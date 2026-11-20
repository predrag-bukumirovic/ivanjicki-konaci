import type { Locale } from "@/lib/i18n";

export type MenuItem = {
  name: string;
  description?: string;
  price: string;
};

export type MenuGroup = "drinks" | "food";

export type MenuCategory = {
  id: string;
  group: MenuGroup;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

type MenuCopy = {
  notice: string;
  categories: MenuCategory[];
};

/* ------------------------------------------------------------------ */
/* Source data — each item and price is defined once for both locales */
/* ------------------------------------------------------------------ */

type Localized = string | Record<Locale, string>;

type SourceItem = {
  name: Localized;
  description?: Localized;
  price: string;
};

type SourceCategory = {
  id: string;
  group: MenuGroup;
  title: Record<Locale, string>;
  subtitle?: Localized;
  items: SourceItem[];
};

const t = (sr: string, en: string): Record<Locale, string> => ({ sr, en });

/** Product name with volume, e.g. vol("Jelen", "0,33") → "Jelen 0,33 l" / "Jelen 0.33 l". */
const vol = (name: Localized, liters: string): Record<Locale, string> => {
  const sr = typeof name === "string" ? name : name.sr;
  const en = typeof name === "string" ? name : name.en;
  return { sr: `${sr} ${liters} l`, en: `${en} ${liters.replace(",", ".")} l` };
};

const omeletNote = t(
  "Uz omlet prilog sir i paradajz.",
  "Served with cheese and tomato.",
);

const wineries = {
  nika: t("Vinarija Nika, Aleksandrovac", "Nika Winery, Aleksandrovac"),
  kovacevic: t(
    "Vinarija Kovačević, Fruška Gora",
    "Kovačević Winery, Fruška Gora",
  ),
  minic: t(
    "Vinska kuća Minić, Aleksandrovac",
    "Minić Wine House, Aleksandrovac",
  ),
  plantaze: t("Plantaže 13. jul, Crna Gora", "Plantaže 13. jul, Montenegro"),
  aleksandrovic: t(
    "Vinarija Aleksandrović, Oplenac",
    "Aleksandrović Winery, Oplenac",
  ),
  radovanovic: t(
    "Podrum Radovanović, Krnjevo",
    "Radovanović Cellar, Krnjevo",
  ),
  zvonkoBogdan: t(
    "Vinarija Zvonko Bogdan, Palić",
    "Zvonko Bogdan Winery, Palić",
  ),
  tikves: t("Vinarija Tikveš, Makedonija", "Tikveš Winery, North Macedonia"),
  rubin: t("Podrum Rubin, Kruševac", "Rubin Cellar, Kruševac"),
  aleksic: t("Vinarija Aleksić, Vranje", "Aleksić Winery, Vranje"),
  kozlovic: t("Vinarija Kozlović, Hrvatska", "Kozlović Winery, Croatia"),
  jermann: t("Jermann, Italija", "Jermann, Italy"),
  chanson: t("Chanson, Francuska", "Chanson, France"),
  italy: t("Italija", "Italy"),
};

/** Wine-by-the-glass description: colour + producer. */
const glass = (color: "white" | "rose" | "red", origin: Record<Locale, string>) => {
  const colors = {
    white: t("Belo", "White"),
    rose: t("Roze", "Rosé"),
    red: t("Crveno", "Red"),
  };
  return t(
    `${colors[color].sr} · ${origin.sr}`,
    `${colors[color].en} · ${origin.en}`,
  );
};

const bottle = t("Flaša 0,75 l", "Bottle 0.75 l");

const categories: SourceCategory[] = [
  /* ============================== HRANA ============================== */
  {
    id: "dorucak",
    group: "food",
    title: t("Doručak", "Breakfast"),
    subtitle: t("Služi se od 08 do 12 h.", "Served from 08:00 to 12:00."),
    items: [
      { name: t("Jaja na oko", "Fried eggs"), price: "490" },
      {
        name: t("Jaja na oko sa slaninom", "Fried eggs with bacon"),
        price: "580",
      },
      {
        name: t("Jaja na oko sa viršlama", "Fried eggs with sausages"),
        price: "550",
      },
      { name: t("Kajgana", "Scrambled eggs"), price: "440" },
      {
        name: t("Kačamak", "Kačamak (cornmeal)"),
        description: t(
          "Sir, kajmak, pržena slanina ili duvan čvarci.",
          "Cheese, kajmak and fried bacon or pork cracklings.",
        ),
        price: "590",
      },
      {
        name: t("Omlet sa povrćem", "Vegetable omelette"),
        description: omeletNote,
        price: "530",
      },
      {
        name: t("Omlet sa pršutom", "Prosciutto omelette"),
        description: omeletNote,
        price: "550",
      },
      {
        name: t("Omlet sa sirom", "Cheese omelette"),
        description: omeletNote,
        price: "530",
      },
      {
        name: t("Omlet sa slaninom", "Bacon omelette"),
        description: omeletNote,
        price: "550",
      },
      {
        name: t("Omlet sa šunkom", "Ham omelette"),
        description: omeletNote,
        price: "520",
      },
      { name: t("Popara", "Popara (bread panada)"), price: "460" },
      {
        name: t("Prženice", "French toast"),
        description: t(
          "Sir, kajmak, pršuta, paradajz i džem.",
          "Cheese, kajmak, prosciutto, tomato and jam.",
        ),
        price: "630",
      },
      { name: t("Viršle", "Viennese sausages"), price: "450" },
      { name: t("Domaći uštipci", "Homemade fritters (uštipci)"), price: "650" },
    ],
  },
  {
    id: "corbe",
    group: "food",
    title: t("Čorbe", "Soups"),
    items: [
      { name: t("Pileća čorba", "Chicken soup"), price: "380" },
      { name: t("Teleća čorba", "Veal soup"), price: "440" },
    ],
  },
  {
    id: "predjela",
    group: "food",
    title: t("Predjela", "Starters"),
    items: [
      { name: t("Sjenički sir (100 g)", "Sjenica cheese (100 g)"), price: "320" },
      { name: t("Kajmak (100 g)", "Kajmak – clotted cream (100 g)"), price: "380" },
      {
        name: t("Paprika u pavlaci (150 g)", "Peppers in sour cream (150 g)"),
        price: "320",
      },
      {
        name: t("Svinjska pršuta (50 g)", "Pork prosciutto (50 g)"),
        price: "350",
      },
      { name: t("Goveđa pršuta (50 g)", "Beef prosciutto (50 g)"), price: "390" },
      {
        name: t("Njeguška pršuta (50 g)", "Njeguši prosciutto (50 g)"),
        price: "520",
      },
      { name: t("Duvan čvarci (100 g)", "Pork cracklings (100 g)"), price: "370" },
      {
        name: t("Slane palačinke", "Savoury pancakes"),
        description: t(
          "Šunka, kačkavalj, pavlaka i kečap.",
          "Ham, cheese, sour cream and ketchup.",
        ),
        price: "550",
      },
      {
        name: t(
          "Suve šljive rolovane u slaninici",
          "Bacon-wrapped dried plums",
        ),
        price: "830",
      },
      { name: t("Pohovani kačkavalj", "Breaded kashkaval cheese"), price: "970" },
      { name: t("Grilovano povrće", "Grilled vegetables"), price: "530" },
    ],
  },
  {
    id: "obrok-salate",
    group: "food",
    title: t("Obrok salate", "Meal salads"),
    items: [
      {
        name: t("Biftek salata", "Beef salad"),
        description: t(
          "Zelena salata, biftek, jaje, tost hleb, čeri paradajz, dresing.",
          "Lettuce, beef tenderloin, egg, toast, cherry tomato, dressing.",
        ),
        price: "1350",
      },
      {
        name: t("Cezar salata", "Caesar salad"),
        description: t(
          "Rukola, piletina, jaje, krutoni hleba, parmezan, slanina, dresing.",
          "Rocket, chicken, egg, croutons, parmesan, bacon, dressing.",
        ),
        price: "1150",
      },
      {
        name: t("Grčka salata", "Greek salad"),
        description: t(
          "Paradajz, krastavac, masline, luk, sir, origano.",
          "Tomato, cucumber, olives, onion, cheese, oregano.",
        ),
        price: "850",
      },
      {
        name: t("Tuna salata", "Tuna salad"),
        description: t(
          "Tunjevina, zelena salata, paradajz, krastavac, kukuruz šećerac, crveni luk.",
          "Tuna, lettuce, tomato, cucumber, sweet corn, red onion.",
        ),
        price: "1050",
      },
    ],
  },
  {
    id: "paste-rizota",
    group: "food",
    title: t("Paste i rižota", "Pasta & risotto"),
    items: [
      { name: t("Karbonara", "Carbonara"), price: "970" },
      {
        name: t(
          "Pasta sa piletinom i 4 vrste sira",
          "Pasta with chicken and four cheeses",
        ),
        price: "1040",
      },
      { name: t("Rižoto sa povrćem", "Vegetable risotto"), price: "1250" },
    ],
  },
  {
    id: "piletina",
    group: "food",
    title: t("Jela od piletine", "Chicken dishes"),
    items: [
      {
        name: t("Hrskava piletina u korn fleksu", "Crispy cornflake chicken"),
        price: "1150",
      },
      { name: t("Pileći file na žaru", "Grilled chicken fillet"), price: "950" },
      {
        name: t(
          "Pileći file u sosu sa 4 vrste sira",
          "Chicken fillet in four-cheese sauce",
        ),
        price: "1250",
      },
      {
        name: t(
          "Pileći ražnjići rolovani u slaninici",
          "Bacon-wrapped chicken skewers",
        ),
        price: "1150",
      },
    ],
  },
  {
    id: "po-porudzbini",
    group: "food",
    title: t("Jela po porudžbini", "Dishes to order"),
    items: [
      { name: t("Bečka šnicla", "Wiener schnitzel"), price: "1150" },
      { name: t("Biftek na žaru", "Grilled beef steak"), price: "2850" },
      {
        name: t(
          "Biftek sa grilovanim povrćem",
          "Beef steak with grilled vegetables",
        ),
        price: "3050",
      },
      {
        name: t("Biftek sa vrganjima", "Beef steak with porcini mushrooms"),
        price: "3050",
      },
      { name: t("Karađorđeva šnicla", "Karađorđe schnitzel"), price: "1380" },
      { name: t("Rolovana teletina (1 kg)", "Rolled veal (1 kg)"), price: "5400" },
    ],
  },
  {
    id: "rostilj",
    group: "food",
    title: t("Jela sa roštilja", "Grill"),
    items: [
      { name: t("Ćevapi (10 kom)", "Ćevapi (10 pcs)"), price: "1250" },
      { name: t("Pljeskavica", "Pljeskavica (grilled patty)"), price: "1250" },
      {
        name: t("Gurmanska pljeskavica", "Gourmet pljeskavica"),
        description: t(
          "Crni luk, ljuta tucana paprika, kačkavalj, slanina.",
          "Onion, crushed hot pepper, cheese, bacon.",
        ),
        price: "1350",
      },
      {
        name: t("Punjena pljeskavica", "Stuffed pljeskavica"),
        description: t("Kačkavalj i šunka.", "Cheese and ham."),
        price: "1250",
      },
      { name: t("Svinjski ražnjići (1 kg)", "Pork skewers (1 kg)"), price: "2760" },
      { name: t("Bela vešalica", "Pork loin strips"), price: "1150" },
      {
        name: t("Punjena bela vešalica", "Stuffed pork loin strips"),
        description: t("Kačkavalj i pančeta.", "Cheese and pancetta."),
        price: "1350",
      },
      { name: t("Domaća kobasica", "Homemade sausage"), price: "1150" },
      {
        name: t("Dimljena vešalica (1 kg)", "Smoked pork loin (1 kg)"),
        price: "3150",
      },
    ],
  },
  {
    id: "riba",
    group: "food",
    title: t("Riba", "Fish"),
    items: [
      {
        name: t("Dimljeni file pastrmke (1 kg)", "Smoked trout fillet (1 kg)"),
        price: "4600",
      },
      { name: t("Kolutići lignje (10 kom)", "Squid rings (10 pcs)"), price: "950" },
      {
        name: t(
          "Sveža pastrmka sa Slatine (1 kg)",
          "Fresh trout from Slatina (1 kg)",
        ),
        price: "3150",
      },
    ],
  },
  {
    id: "salate",
    group: "food",
    title: t("Salate", "Salads"),
    items: [
      { name: t("Bašta salata", "Garden mix salad"), price: "420" },
      {
        name: t("Ljuta paprika sveža (1 kom)", "Fresh hot pepper (1 pc)"),
        price: "120",
      },
      {
        name: t("Ljuta paprika u ulju (1 kom)", "Hot pepper in oil (1 pc)"),
        price: "160",
      },
      { name: t("Paradajz", "Tomato"), price: "340" },
      { name: t("Šopska salata", "Shopska salad"), price: "420" },
      { name: t("Srpska salata", "Serbian salad"), price: "370" },
      { name: t("Kupus salata", "Cabbage salad"), price: "270" },
      { name: t("Vitaminska salata", "Vitamin salad"), price: "470" },
      { name: t("Zelena salata", "Lettuce"), price: "360" },
    ],
  },
  {
    id: "zimske-salate",
    group: "food",
    title: t("Zimske salate", "Winter salads"),
    items: [
      { name: t("Pečena paprika", "Roasted peppers"), price: "440" },
      { name: t("Kiseli kupus", "Sauerkraut"), price: "380" },
      { name: t("Ajvar", "Ajvar (red pepper spread)"), price: "450" },
    ],
  },
  {
    id: "hleb",
    group: "food",
    title: t("Hleb", "Bread"),
    items: [
      { name: t("Lepinja", "Lepinja (flatbread)"), price: "80" },
      { name: t("Proja (porcija)", "Cornbread (portion)"), price: "240" },
    ],
  },
  {
    id: "deserti",
    group: "food",
    title: t("Deserti", "Desserts"),
    items: [
      { name: t("Domaće torte i kolači", "Homemade cakes"), price: "420" },
      { name: t("Sladoled (kugla)", "Ice cream (scoop)"), price: "150" },
      { name: t("Voćna salata", "Fruit salad"), price: "520" },
      {
        name: t(
          "Palačinke sa krem-plazmom",
          "Pancakes with chocolate spread and biscuits",
        ),
        price: "480",
      },
      {
        name: t("Palačinke sa domaćim džemom", "Pancakes with homemade jam"),
        price: "460",
      },
      {
        name: t("Palačinke sa medom i orasima", "Pancakes with honey and walnuts"),
        price: "490",
      },
      {
        name: t("Tart sa šljivom", "Plum tart"),
        description: t(
          "Služi se sa kuglom sladoleda.",
          "Served with a scoop of ice cream.",
        ),
        price: "480",
      },
    ],
  },

  /* ============================ KARTA PIĆA ============================ */
  {
    id: "topli-napici",
    group: "drinks",
    title: t("Topli napici", "Hot drinks"),
    items: [
      { name: t("Domaća kafa", "Serbian coffee"), price: "180" },
      { name: t("Dupla domaća kafa", "Double Serbian coffee"), price: "320" },
      { name: t("Espreso", "Espresso"), price: "220" },
      { name: t("Espreso sa mlekom", "Espresso with milk"), price: "240" },
      { name: t("Kapućino", "Cappuccino"), price: "260" },
      { name: t("Nes kafa", "Nescafé"), price: "280" },
      { name: t("Čaj", "Tea"), price: "220" },
      { name: t("Kakao", "Cocoa"), price: "220" },
    ],
  },
  {
    id: "hladni-napici",
    group: "drinks",
    title: t("Hladni napici", "Cold drinks"),
    items: [
      { name: t("Ledeni čaj", "Iced tea"), price: "290" },
      { name: t("Ledena kafa", "Iced coffee"), price: "420" },
    ],
  },
  {
    id: "vode",
    group: "drinks",
    title: t("Vode", "Water"),
    items: [
      { name: vol(t("Rosa gazirana", "Rosa sparkling"), "0,33"), price: "180" },
      { name: vol(t("Rosa gazirana", "Rosa sparkling"), "0,75"), price: "320" },
      { name: vol(t("Rosa negazirana", "Rosa still"), "0,33"), price: "180" },
      { name: vol(t("Rosa negazirana", "Rosa still"), "0,75"), price: "300" },
      { name: vol("Römerquelle", "0,33"), price: "270" },
    ],
  },
  {
    id: "prirodni-sokovi",
    group: "drinks",
    title: t("Prirodni sokovi", "Fresh juices"),
    items: [
      { name: t("Limunada", "Lemonade"), price: "280" },
      { name: t("Ceđena pomorandža", "Fresh orange juice"), price: "380" },
      { name: t("Ceđeni mix", "Fresh juice mix"), price: "420" },
    ],
  },
  {
    id: "sokovi",
    group: "drinks",
    title: t("Sokovi", "Soft drinks"),
    items: [
      { name: t("Next jabuka", "Next apple"), price: "260" },
      { name: t("Next breskva", "Next peach"), price: "260" },
      { name: t("Next jagoda", "Next strawberry"), price: "260" },
      { name: t("Next pomorandža", "Next orange"), price: "260" },
      { name: t("Next borovnica", "Next blueberry"), price: "260" },
      { name: "Coca-Cola", price: "270" },
      { name: "Coca-Cola Zero", price: "280" },
      { name: "Fanta", price: "260" },
      { name: "Bitter Lemon", price: "270" },
      { name: "Tonic", price: "270" },
      // Printed menu says 2560 din — obvious typo; confirm with the restaurant.
      { name: "Tangerina", price: "260" },
      { name: "Cedevita", price: "240" },
    ],
  },
  {
    id: "flasirano-pivo",
    group: "drinks",
    title: t("Flaširano pivo", "Bottled beer"),
    items: [
      { name: vol("Nikšićko", "0,33"), price: "280" },
      { name: vol(t("Nikšićko tamno", "Nikšićko dark"), "0,33"), price: "290" },
      { name: vol("Zaječarsko", "0,33"), price: "240" },
      { name: vol("Stella Artois", "0,33"), price: "360" },
      { name: vol("Jelen", "0,33"), price: "240" },
      { name: vol("Staropramen", "0,33"), price: "280" },
      { name: vol("Heineken", "0,25"), price: "300" },
      { name: vol("Heineken", "0,4"), price: "280" },
      { name: "Birra Moretti", price: "260" },
      { name: "Laško", price: "260" },
      { name: "Kvas", price: "250" },
    ],
  },
  {
    id: "toceno-pivo",
    group: "drinks",
    title: t("Točeno pivo", "Draft beer"),
    items: [
      { name: vol("Nikšićko", "0,3"), price: "280" },
      { name: vol("Nikšićko", "0,5"), price: "330" },
      { name: vol("Hoegaarden", "0,3"), price: "390" },
      { name: vol("Hoegaarden", "0,5"), price: "490" },
    ],
  },
  {
    id: "vina-na-casu",
    group: "drinks",
    title: t("Vina na čašu", "Wine by the glass"),
    subtitle: t("Čaša 0,15 l", "Glass 0.15 l"),
    items: [
      { name: "Prznica", description: glass("white", wineries.nika), price: "390" },
      {
        name: "Čudesni krug",
        description: glass("rose", wineries.nika),
        price: "360",
      },
      {
        name: "Chardonnay Kovačević",
        description: glass("white", wineries.kovacevic),
        price: "600",
      },
      {
        name: "Stota suza",
        description: glass("white", wineries.minic),
        price: "560",
      },
      { name: "Vranac", description: glass("red", wineries.plantaze), price: "450" },
      {
        name: "Regent",
        description: glass("red", wineries.aleksandrovic),
        price: "820",
      },
      {
        name: "Primitivo Puglia",
        description: glass("red", wineries.italy),
        price: "620",
      },
    ],
  },
  {
    id: "bela-vina",
    group: "drinks",
    title: t("Bela vina", "White wine"),
    subtitle: bottle,
    items: [
      { name: "Smederevka", description: wineries.tikves, price: "1750" },
      { name: "Prznica", description: wineries.nika, price: "1550" },
      {
        name: "Chardonnay Radovanović",
        description: wineries.radovanovic,
        price: "2800",
      },
      {
        name: "Chardonnay Kovačević",
        description: wineries.kovacevic,
        price: "2800",
      },
      { name: "8 tamburaša", description: wineries.zvonkoBogdan, price: "2700" },
      {
        name: "ZB Sauvignon Blanc",
        description: wineries.zvonkoBogdan,
        price: "2900",
      },
      { name: "ZB Chardonnay", description: wineries.zvonkoBogdan, price: "3200" },
      { name: "Stota suza", description: wineries.minic, price: "2600" },
      { name: "Malvazija", description: wineries.kozlovic, price: "4200" },
      { name: "Jermann Pinot Grigio", description: wineries.jermann, price: "7500" },
      { name: "Jermann Chardonnay", description: wineries.jermann, price: "7800" },
      {
        name: "Chablis Montmains 1er Cru",
        description: wineries.chanson,
        price: "7800",
      },
      { name: "Chablis", description: wineries.chanson, price: "7500" },
    ],
  },
  {
    id: "roze-vina",
    group: "drinks",
    title: t("Roze vina", "Rosé wine"),
    subtitle: bottle,
    items: [
      { name: "Rubin Rose", description: wineries.rubin, price: "1250" },
      { name: "Tikveš Rose", description: wineries.tikves, price: "1450" },
      { name: "Čudesni krug", description: wineries.nika, price: "1500" },
      { name: "Barbara", description: wineries.aleksic, price: "2200" },
      {
        name: "Zvonko Bogdan Rose",
        description: wineries.zvonkoBogdan,
        price: "2800",
      },
      {
        name: "L'Ostal",
        description: t(
          "Domaine de l'Ostal, Francuska",
          "Domaine de l'Ostal, France",
        ),
        price: "2950",
      },
      { name: "Miraval", price: "5200" },
      { name: "Casal Mendes", price: "1900" },
    ],
  },
  {
    id: "crvena-vina",
    group: "drinks",
    title: t("Crvena vina", "Red wine"),
    subtitle: bottle,
    items: [
      { name: "Vranac", description: wineries.plantaze, price: "1350" },
      { name: "Vranac Pro Corde", description: wineries.plantaze, price: "2250" },
      { name: "Aurelius", description: wineries.kovacevic, price: "3150" },
      {
        name: "Cabernet Sauvignon",
        description: wineries.radovanovic,
        price: "2950",
      },
      { name: "Regent", description: wineries.aleksandrovic, price: "3600" },
      { name: "Život teče", description: wineries.zvonkoBogdan, price: "3950" },
      {
        name: "Michel Lynch",
        description: t("Bordeaux, Francuska", "Bordeaux, France"),
        price: "5800",
      },
      { name: "Barovo", description: wineries.tikves, price: "6900" },
      { name: "Primitivo Puglia", description: wineries.italy, price: "2950" },
      { name: "Edizioni Fanini", description: wineries.italy, price: "5900" },
      {
        name: "Terasse a L'Ombre",
        description: t("Catou Gordon, Francuska", "Catou Gordon, France"),
        price: "5900",
      },
    ],
  },
  {
    id: "penusava-vina",
    group: "drinks",
    title: t("Penušava vina", "Sparkling wine"),
    subtitle: bottle,
    items: [
      { name: "Prosecco Duca d'Alba", price: "1900" },
      { name: "Prosecco DOC", price: "2900" },
      { name: "Prosecco Barocco", price: "3500" },
      { name: "Mionetto Prosecco DOC", price: "3800" },
      { name: "Henkell", price: "3600" },
      { name: vol("Henkell Trocken", "1,5"), price: "4200" },
      { name: "Moët & Chandon", price: "13800" },
      { name: "Bollinger Cuvée", price: "22600" },
      { name: "Bottega Gold", price: "7600" },
      { name: "Boroluce Prosecco", price: "3650" },
      { name: "Dom Pérignon", price: "40000" },
    ],
  },
  {
    id: "rakije",
    group: "drinks",
    title: t("Rakije", "Rakija"),
    items: [
      { name: t("Domaća šljiva", "Homemade plum rakija"), price: "240" },
      { name: t("Domaća viljamovka", "Homemade Williams pear rakija"), price: "280" },
      { name: t("Savićević šljiva", "Savićević plum"), price: "280" },
      { name: t("Savićević viljamovka", "Savićević Williams pear"), price: "320" },
      { name: t("Savićević kajsija", "Savićević apricot"), price: "320" },
      { name: t("Savićević jabuka", "Savićević apple"), price: "290" },
      { name: t("Šljiva Gazda Jezda", "Gazda Jezda plum"), price: "340" },
      { name: "Kraljica šljivovica", price: "340" },
      { name: "Zlatna nit", price: "420" },
      { name: "Alternativa šljivovica", price: "300" },
      { name: "Antika lozovača", price: "320" },
      { name: "Jelički dukat", price: "490" },
      { name: "Stara sokolova", price: "520" },
    ],
  },
  {
    id: "zestoka-pica",
    group: "drinks",
    title: t("Žestoka pića i likeri", "Spirits & liqueurs"),
    items: [
      { name: "Gorki list", price: "250" },
      { name: t("Rubin vinjak", "Rubin vinjak (brandy)"), price: "220" },
      { name: "Smirnoff vodka", price: "360" },
      { name: "Beluga Noble", price: "420" },
      { name: "Absolut vodka", price: "300" },
      { name: "Wapping Gin", price: "260" },
      { name: "Mariachi tequila", price: "380" },
      { name: "Campari", price: "350" },
      { name: "Martini Bianco", price: "330" },
      { name: t("Vermut", "Vermouth"), price: "320" },
      { name: "Aperol", price: "650" },
      { name: "Bacardi", price: "330" },
    ],
  },
  {
    id: "konjak",
    group: "drinks",
    title: t("Konjak", "Cognac & brandy"),
    items: [
      { name: "Hennessy V.S.", price: "550" },
      { name: "Hennessy Fine Cognac", price: "680" },
      { name: "Courvoisier V.S.", price: "520" },
      { name: "Courvoisier V.S.O.P.", price: "760" },
      { name: "Rémy Martin V.S.", price: "680" },
      { name: "Rémy Martin V.S.O.P.", price: "820" },
      { name: "Beehive V.S.O.P.", price: "250" },
      // Printed as "Metaxa*****" (390) and "Metaxa******" (360) — confirm star counts.
      { name: "Metaxa 5*", price: "390" },
      { name: "Metaxa 6*", price: "360" },
    ],
  },
  {
    id: "viski",
    group: "drinks",
    title: t("Viski i burboni", "Whisky & bourbon"),
    items: [
      { name: "Ballantine's", price: "340" },
      { name: "Johnnie Walker Red Label", price: "360" },
      { name: "Johnnie Walker Black Label", price: "520" },
      { name: "Chivas Regal 12 Y.O.", price: "550" },
      { name: "Chivas Regal 18 Y.O.", price: "980" },
      { name: "Jack Daniel's", price: "490" },
      { name: "Jameson", price: "420" },
      { name: "Gentleman Jack", price: "590" },
      { name: "Jack Daniel's Single Barrel", price: "740" },
    ],
  },
];

const notice: Record<Locale, string> = {
  sr: "Za alergene, dnevnu dostupnost jela i posebne zahteve obratite se osoblju restorana.",
  en: "For allergens, daily availability and special requests, please ask the restaurant staff.",
};

function localize(value: Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

export function getMenu(locale: Locale): MenuCopy {
  return {
    notice: notice[locale],
    categories: categories.map((category) => ({
      id: category.id,
      group: category.group,
      title: category.title[locale],
      subtitle: category.subtitle
        ? localize(category.subtitle, locale)
        : undefined,
      items: category.items.map((item) => ({
        name: localize(item.name, locale),
        description: item.description
          ? localize(item.description, locale)
          : undefined,
        price: item.price,
      })),
    })),
  };
}
