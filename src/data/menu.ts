import type { Locale } from "@/lib/i18n";

export type MenuBadge =
  | "event"
  | "guest"
  | "house"
  | "kids"
  | "popular"
  | "seasonal"
  | "vegetarian";

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  badges?: MenuBadge[];
};

export type MenuGroup = "drinks" | "food";

export type MenuCategory = {
  id: string;
  group: MenuGroup;
  title: string;
  subtitle: string;
  items: MenuItem[];
};

type MenuCopy = {
  notice: string;
  categories: MenuCategory[];
};

const menuCopy: Record<Locale, MenuCopy> = {
  sr: {
    notice:
      "Cene su izražene u dinarima (RSD). Za alergene, dnevnu dostupnost i porudžbine za veće grupe pitajte osoblje restorana.",
    categories: [
      {
        id: "dorucak",
        group: "food",
        title: "Doručak",
        subtitle: "Domaći doručak za goste smeštaja i posetioce restorana.",
        items: [
          {
            name: "Planinski doručak",
            description:
              "Jaja, sir, kajmak, suhomesnato, paradajz, domaći hleb.",
            price: "890",
            badges: ["house", "popular"],
          },
          {
            name: "Uštipci",
            description: "Uštipci sa sirom, kajmakom ili domaćim džemom.",
            price: "590",
            badges: ["house"],
          },
          {
            name: "Prženice",
            description: "Prženice sa sirom, pavlakom i sezonskim prilogom.",
            price: "520",
          },
          {
            name: "Omlet sa sirom",
            description: "Tri jaja, sir, sezonska salata i domaći hleb.",
            price: "560",
            badges: ["vegetarian"],
          },
          {
            name: "Omlet sa šunkom",
            description: "Tri jaja, šunka, sir, sezonska salata i hleb.",
            price: "620",
          },
          {
            name: "Kačamak sa kajmakom",
            description: "Topao kačamak sa domaćim kajmakom i sirom.",
            price: "690",
            badges: ["house", "vegetarian"],
          },
        ],
      },
      {
        id: "predjela",
        group: "food",
        title: "Predjela",
        subtitle: "Domaća predjela za početak obroka ili deljenje za sto.",
        items: [
          {
            name: "Domaće meze",
            description: "Suhomesnato, sir, kajmak, ajvar i domaći hleb.",
            price: "1450",
            badges: ["house", "popular"],
          },
          {
            name: "Sir i kajmak",
            description: "Domaći sir i kajmak, porcija za jednu osobu.",
            price: "690",
            badges: ["vegetarian"],
          },
          {
            name: "Proja sa sirom",
            description: "Domaća proja sa sirom i kajmakom.",
            price: "420",
            badges: ["house", "vegetarian"],
          },
          {
            name: "Pita sa sirom",
            description: "Domaća pita sa sirom, servirana topla.",
            price: "490",
            badges: ["vegetarian"],
          },
          {
            name: "Ajvar porcija",
            description: "Domaći ajvar kao dodatak uz predjelo ili roštilj.",
            price: "280",
            badges: ["seasonal", "vegetarian"],
          },
        ],
      },
      {
        id: "supe-corbe",
        group: "food",
        title: "Supe i čorbe",
        subtitle: "Topla domaća jela za lagan početak ručka.",
        items: [
          {
            name: "Domaća supa",
            description: "Bistra domaća supa sa rezancima.",
            price: "320",
          },
          {
            name: "Teleća čorba",
            description: "Gusta teleća čorba sa povrćem.",
            price: "490",
            badges: ["popular"],
          },
          {
            name: "Paradajz čorba",
            description: "Topla paradajz čorba sa začinima.",
            price: "360",
            badges: ["vegetarian"],
          },
        ],
      },
      {
        id: "rostilj",
        group: "food",
        title: "Roštilj",
        subtitle: "Klasična roštiljska jela sa prilogom.",
        items: [
          {
            name: "10 ćevapa",
            description: "Ćevapi u lepinji sa lukom i kajmakom.",
            price: "950",
            badges: ["popular"],
          },
          {
            name: "Pljeskavica",
            description: "Pljeskavica u lepinji sa lukom i prilogom.",
            price: "890",
          },
          {
            name: "Gurmanska pljeskavica",
            description: "Pikantna pljeskavica sa sirom, slaninom i prilogom.",
            price: "1150",
            badges: ["popular"],
          },
          {
            name: "Pileći file",
            description: "Pileći file sa krompirom i sezonskom salatom.",
            price: "1050",
          },
          {
            name: "Dimljena vešalica",
            description: "Dimljena svinjska vešalica sa krompirom.",
            price: "1350",
          },
          {
            name: "Mešano meso",
            description: "Ćevapi, pljeskavica, kobasica, piletina i prilog.",
            price: "1850",
            badges: ["house"],
          },
        ],
      },
      {
        id: "kuvana-jela",
        group: "food",
        title: "Kuvana jela",
        subtitle: "Domaća jela na kašiku i porcije za ručak.",
        items: [
          {
            name: "Sarma",
            description: "Domaća sarma sa kiselim kupusom i pire krompirom.",
            price: "980",
            badges: ["house", "popular"],
          },
          {
            name: "Pasulj sa suvim mesom",
            description: "Domaći pasulj sa suvim mesom i salatom.",
            price: "890",
            badges: ["house"],
          },
          {
            name: "Gulaš",
            description: "Juneći gulaš sa pire krompirom.",
            price: "1050",
          },
          {
            name: "Punjene paprike",
            description: "Punjene paprike sa pire krompirom.",
            price: "920",
            badges: ["seasonal"],
          },
          {
            name: "Jagnjetina ispod sača",
            description: "Jagnjetina sa krompirom, porcija za jednu osobu.",
            price: "2100",
            badges: ["house"],
          },
          {
            name: "Teletina ispod sača",
            description: "Teletina sa krompirom, porcija za jednu osobu.",
            price: "2300",
            badges: ["house"],
          },
        ],
      },
      {
        id: "salate-prilozi",
        group: "food",
        title: "Salate i prilozi",
        subtitle: "Sveže salate i prilozi uz glavna jela.",
        items: [
          {
            name: "Šopska salata",
            description: "Paradajz, krastavac, paprika, luk i sir.",
            price: "390",
            badges: ["vegetarian"],
          },
          {
            name: "Srpska salata",
            description: "Paradajz, krastavac, paprika i luk.",
            price: "340",
            badges: ["vegetarian"],
          },
          {
            name: "Kupus salata",
            description: "Svež kupus sa začinima.",
            price: "280",
            badges: ["vegetarian"],
          },
          {
            name: "Pečena paprika",
            description: "Pečena paprika sa belim lukom.",
            price: "420",
            badges: ["seasonal", "vegetarian"],
          },
          {
            name: "Pomfrit",
            description: "Porcija prženog krompira.",
            price: "350",
            badges: ["vegetarian"],
          },
          {
            name: "Domaći hleb",
            description: "Korpa domaćeg hleba.",
            price: "150",
          },
        ],
      },
      {
        id: "dezerti",
        group: "food",
        title: "Dezerti",
        subtitle: "Domaće poslastice za završetak obroka.",
        items: [
          {
            name: "Palačinke sa kremom",
            description: "Dve palačinke sa kremom i plazmom.",
            price: "420",
            badges: ["kids", "popular"],
          },
          {
            name: "Palačinke sa džemom",
            description: "Dve palačinke sa domaćim džemom.",
            price: "390",
            badges: ["house"],
          },
          {
            name: "Domaća pita sa jabukama",
            description: "Topla pita sa jabukama i šećerom u prahu.",
            price: "450",
            badges: ["house"],
          },
          {
            name: "Domaći kolač",
            description: "Kolač iz dnevne ponude.",
            price: "390",
            badges: ["seasonal"],
          },
        ],
      },
      {
        id: "topli-napici",
        group: "drinks",
        title: "Topli napici",
        subtitle: "Kafa, čaj i topli napici iz restoranske ponude.",
        items: [
          {
            name: "Domaća kafa",
            description: "Tradicionalna domaća kafa.",
            price: "180",
            badges: ["popular"],
          },
          {
            name: "Espresso",
            description: "Kratki espresso.",
            price: "190",
          },
          {
            name: "Cappuccino",
            description: "Espresso sa toplim mlekom i penom.",
            price: "240",
          },
          {
            name: "Čaj",
            description: "Čaj iz ponude restorana.",
            price: "160",
          },
        ],
      },
      {
        id: "vode",
        group: "drinks",
        title: "Vode",
        subtitle: "Flaširane vode za sto i pojedinačno posluženje.",
        items: [
          {
            name: "Kisela voda 0.25 l",
            description: "Flaširana kisela voda.",
            price: "160",
          },
          {
            name: "Negazirana voda 0.33 l",
            description: "Flaširana negazirana voda.",
            price: "150",
          },
          {
            name: "Voda 0.75 l",
            description: "Flaširana voda za sto.",
            price: "350",
          },
        ],
      },
      {
        id: "bezalkoholna-pica",
        group: "drinks",
        title: "Bezalkoholna pića",
        subtitle: "Sokovi, limunada i ceđeni napici.",
        items: [
          {
            name: "Gazirani sok 0.33 l",
            description: "Coca-Cola, Fanta, Sprite ili drugi sok iz ponude.",
            price: "280",
          },
          {
            name: "Negazirani sok 0.2 l",
            description: "Sok iz trenutne ponude restorana.",
            price: "260",
          },
          {
            name: "Limunada",
            description: "Sveže pripremljena limunada.",
            price: "300",
          },
          {
            name: "Ceđena narandža",
            description: "Sveže ceđeni sok od narandže.",
            price: "420",
          },
        ],
      },
      {
        id: "piva",
        group: "drinks",
        title: "Piva",
        subtitle: "Točena i flaširana piva.",
        items: [
          {
            name: "Točeno pivo 0.5 l",
            description: "Točeno pivo iz trenutne ponude.",
            price: "350",
          },
          {
            name: "Domaće pivo 0.5 l",
            description: "Flaširano domaće pivo.",
            price: "360",
          },
          {
            name: "Premium pivo 0.33 l",
            description: "Flaširano premium pivo.",
            price: "450",
          },
        ],
      },
      {
        id: "vina",
        group: "drinks",
        title: "Vina",
        subtitle: "Vina na čašu i flašu.",
        items: [
          {
            name: "Čaša vina 0.15 l",
            description: "Belo, roze ili crveno vino iz ponude.",
            price: "420",
          },
          {
            name: "Kućno vino 0.75 l",
            description: "Flaša kućnog vina za sto.",
            price: "1800",
          },
        ],
      },
      {
        id: "rakije",
        group: "drinks",
        title: "Rakije",
        subtitle: "Domaće rakije po čašici.",
        items: [
          {
            name: "Domaća rakija 0.03 l",
            description: "Rakija iz domaće ponude.",
            price: "260",
            badges: ["house"],
          },
          {
            name: "Šljivovica 0.03 l",
            description: "Domaća rakija od šljive.",
            price: "280",
            badges: ["house"],
          },
          {
            name: "Kajsija 0.03 l",
            description: "Domaća rakija od kajsije.",
            price: "320",
            badges: ["house"],
          },
          {
            name: "Dunja 0.03 l",
            description: "Domaća rakija od dunje.",
            price: "320",
            badges: ["house"],
          },
        ],
      },
      {
        id: "proslave",
        group: "food",
        title: "Ponuda za proslave",
        subtitle: "Rođendani, svadbe i privatni događaji.",
        items: [
          {
            name: "Svečani meni",
            description: "Kompletan meni za svadbe i veća okupljanja.",
            price: "3.500 RSD/osoba",
            badges: ["event"],
          },
          {
            name: "Dečiji rođendan",
            description: "Hrana, piće i prostor za dečije proslave.",
            price: "1.800 RSD/osoba",
            badges: ["event", "kids"],
          },
          {
            name: "Porodični ručak",
            description: "Organizovan ručak za porodicu ili manju grupu.",
            price: "2.200 RSD/osoba",
            badges: ["event", "house"],
          },
        ],
      },
    ],
  },
  en: {
    notice:
      "Prices are shown in Serbian dinars (RSD). For allergens, daily availability and larger group orders, please ask the restaurant staff.",
    categories: [
      {
        id: "breakfast",
        group: "food",
        title: "Breakfast",
        subtitle: "Local breakfast for accommodation guests and visitors.",
        items: [
          {
            name: "Mountain breakfast",
            description:
              "Eggs, cheese, kajmak, cured meat, tomato and local bread.",
            price: "890",
            badges: ["house", "popular"],
          },
          {
            name: "Fritters",
            description: "Fritters with cheese, kajmak or homemade jam.",
            price: "590",
            badges: ["house"],
          },
          {
            name: "French toast",
            description: "French toast with cheese, sour cream and seasonal side.",
            price: "520",
          },
          {
            name: "Cheese omelette",
            description: "Three eggs, cheese, seasonal salad and local bread.",
            price: "560",
            badges: ["vegetarian"],
          },
          {
            name: "Ham omelette",
            description: "Three eggs, ham, cheese, seasonal salad and bread.",
            price: "620",
          },
          {
            name: "Kačamak with kajmak",
            description: "Warm cornmeal dish with local kajmak and cheese.",
            price: "690",
            badges: ["house", "vegetarian"],
          },
        ],
      },
      {
        id: "starters",
        group: "food",
        title: "Starters",
        subtitle: "Local starters for the table or sharing.",
        items: [
          {
            name: "Local meze",
            description: "Cured meat, cheese, kajmak, ajvar and local bread.",
            price: "1450",
            badges: ["house", "popular"],
          },
          {
            name: "Cheese and kajmak",
            description: "Local cheese and kajmak, single serving.",
            price: "690",
            badges: ["vegetarian"],
          },
          {
            name: "Cornbread with cheese",
            description: "Local cornbread with cheese and kajmak.",
            price: "420",
            badges: ["house", "vegetarian"],
          },
          {
            name: "Cheese pie",
            description: "Warm homemade cheese pie.",
            price: "490",
            badges: ["vegetarian"],
          },
          {
            name: "Ajvar portion",
            description: "Homemade ajvar as a side for starters or grill.",
            price: "280",
            badges: ["seasonal", "vegetarian"],
          },
        ],
      },
      {
        id: "soups",
        group: "food",
        title: "Soups",
        subtitle: "Warm local soups for an easy start to lunch.",
        items: [
          {
            name: "Homemade soup",
            description: "Clear homemade soup with noodles.",
            price: "320",
          },
          {
            name: "Veal soup",
            description: "Thick veal soup with vegetables.",
            price: "490",
            badges: ["popular"],
          },
          {
            name: "Tomato soup",
            description: "Warm tomato soup with herbs.",
            price: "360",
            badges: ["vegetarian"],
          },
        ],
      },
      {
        id: "grill",
        group: "food",
        title: "Grill",
        subtitle: "Classic grilled dishes with a side.",
        items: [
          {
            name: "10 ćevapi",
            description: "Ćevapi in flatbread with onion and kajmak.",
            price: "950",
            badges: ["popular"],
          },
          {
            name: "Pljeskavica",
            description: "Grilled patty in flatbread with onion and side.",
            price: "890",
          },
          {
            name: "Gourmet pljeskavica",
            description: "Spicy patty with cheese, bacon and side.",
            price: "1150",
            badges: ["popular"],
          },
          {
            name: "Chicken fillet",
            description: "Chicken fillet with potatoes and seasonal salad.",
            price: "1050",
          },
          {
            name: "Smoked pork loin",
            description: "Smoked pork loin with potatoes.",
            price: "1350",
          },
          {
            name: "Mixed grill",
            description: "Ćevapi, patty, sausage, chicken and side.",
            price: "1850",
            badges: ["house"],
          },
        ],
      },
      {
        id: "cooked-dishes",
        group: "food",
        title: "Cooked Dishes",
        subtitle: "Local cooked dishes and lunch portions.",
        items: [
          {
            name: "Sarma",
            description: "Homemade sarma with sauerkraut and mashed potatoes.",
            price: "980",
            badges: ["house", "popular"],
          },
          {
            name: "Beans with smoked meat",
            description: "Homemade beans with smoked meat and salad.",
            price: "890",
            badges: ["house"],
          },
          {
            name: "Goulash",
            description: "Beef goulash with mashed potatoes.",
            price: "1050",
          },
          {
            name: "Stuffed peppers",
            description: "Stuffed peppers with mashed potatoes.",
            price: "920",
            badges: ["seasonal"],
          },
          {
            name: "Lamb under the sač",
            description: "Lamb with potatoes, single serving.",
            price: "2100",
            badges: ["house"],
          },
          {
            name: "Veal under the sač",
            description: "Veal with potatoes, single serving.",
            price: "2300",
            badges: ["house"],
          },
        ],
      },
      {
        id: "salads-sides",
        group: "food",
        title: "Salads And Sides",
        subtitle: "Fresh salads and sides for main dishes.",
        items: [
          {
            name: "Šopska salad",
            description: "Tomato, cucumber, pepper, onion and cheese.",
            price: "390",
            badges: ["vegetarian"],
          },
          {
            name: "Serbian salad",
            description: "Tomato, cucumber, pepper and onion.",
            price: "340",
            badges: ["vegetarian"],
          },
          {
            name: "Cabbage salad",
            description: "Fresh cabbage with seasoning.",
            price: "280",
            badges: ["vegetarian"],
          },
          {
            name: "Roasted pepper",
            description: "Roasted pepper with garlic.",
            price: "420",
            badges: ["seasonal", "vegetarian"],
          },
          {
            name: "French fries",
            description: "Portion of fried potatoes.",
            price: "350",
            badges: ["vegetarian"],
          },
          {
            name: "Local bread",
            description: "Basket of local bread.",
            price: "150",
          },
        ],
      },
      {
        id: "desserts",
        group: "food",
        title: "Desserts",
        subtitle: "Homemade sweets for the end of the meal.",
        items: [
          {
            name: "Pancakes with cream",
            description: "Two pancakes with cream and biscuit crumbs.",
            price: "420",
            badges: ["kids", "popular"],
          },
          {
            name: "Pancakes with jam",
            description: "Two pancakes with homemade jam.",
            price: "390",
            badges: ["house"],
          },
          {
            name: "Homemade apple pie",
            description: "Warm apple pie with powdered sugar.",
            price: "450",
            badges: ["house"],
          },
          {
            name: "Homemade cake",
            description: "Cake from the daily offer.",
            price: "390",
            badges: ["seasonal"],
          },
        ],
      },
      {
        id: "hot-drinks",
        group: "drinks",
        title: "Hot Drinks",
        subtitle: "Coffee, tea and warm drinks from the restaurant offer.",
        items: [
          {
            name: "Domestic coffee",
            description: "Traditional domestic coffee.",
            price: "180",
            badges: ["popular"],
          },
          {
            name: "Espresso",
            description: "Short espresso.",
            price: "190",
          },
          {
            name: "Cappuccino",
            description: "Espresso with warm milk and foam.",
            price: "240",
          },
          {
            name: "Tea",
            description: "Tea from the restaurant offer.",
            price: "160",
          },
        ],
      },
      {
        id: "water",
        group: "drinks",
        title: "Water",
        subtitle: "Bottled water for the table or single serving.",
        items: [
          {
            name: "Sparkling water 0.25 l",
            description: "Bottled sparkling water.",
            price: "160",
          },
          {
            name: "Still water 0.33 l",
            description: "Bottled still water.",
            price: "150",
          },
          {
            name: "Water 0.75 l",
            description: "Bottled water for the table.",
            price: "350",
          },
        ],
      },
      {
        id: "soft-drinks",
        group: "drinks",
        title: "Soft Drinks",
        subtitle: "Juices, lemonade and freshly squeezed drinks.",
        items: [
          {
            name: "Soft drink 0.33 l",
            description: "Coca-Cola, Fanta, Sprite or another available drink.",
            price: "280",
          },
          {
            name: "Juice 0.2 l",
            description: "Juice from the current restaurant offer.",
            price: "260",
          },
          {
            name: "Lemonade",
            description: "Freshly prepared lemonade.",
            price: "300",
          },
          {
            name: "Fresh orange juice",
            description: "Freshly squeezed orange juice.",
            price: "420",
          },
        ],
      },
      {
        id: "beer",
        group: "drinks",
        title: "Beer",
        subtitle: "Draft and bottled beers.",
        items: [
          {
            name: "Draft beer 0.5 l",
            description: "Draft beer from the current offer.",
            price: "350",
          },
          {
            name: "Domestic beer 0.5 l",
            description: "Bottled domestic beer.",
            price: "360",
          },
          {
            name: "Premium beer 0.33 l",
            description: "Bottled premium beer.",
            price: "450",
          },
        ],
      },
      {
        id: "wine",
        group: "drinks",
        title: "Wine",
        subtitle: "Wine by glass and bottle.",
        items: [
          {
            name: "Glass of wine 0.15 l",
            description: "White, rose or red wine from the offer.",
            price: "420",
          },
          {
            name: "House wine 0.75 l",
            description: "Bottle of house wine for the table.",
            price: "1800",
          },
        ],
      },
      {
        id: "rakija",
        group: "drinks",
        title: "Rakija",
        subtitle: "Domestic rakija by small glass.",
        items: [
          {
            name: "Domestic rakija 0.03 l",
            description: "Rakija from the domestic offer.",
            price: "260",
            badges: ["house"],
          },
          {
            name: "Šljivovica 0.03 l",
            description: "Domestic plum rakija.",
            price: "280",
            badges: ["house"],
          },
          {
            name: "Apricot rakija 0.03 l",
            description: "Domestic apricot rakija.",
            price: "320",
            badges: ["house"],
          },
          {
            name: "Quince rakija 0.03 l",
            description: "Domestic quince rakija.",
            price: "320",
            badges: ["house"],
          },
        ],
      },
      {
        id: "events",
        group: "food",
        title: "Event Menus",
        subtitle: "Birthdays, weddings and private events.",
        items: [
          {
            name: "Celebration menu",
            description: "Complete menu for weddings and larger gatherings.",
            price: "3.500 RSD/person",
            badges: ["event"],
          },
          {
            name: "Children's birthday",
            description: "Food, drinks and space for children's celebrations.",
            price: "1.800 RSD/person",
            badges: ["event", "kids"],
          },
          {
            name: "Family lunch",
            description: "Organized lunch for a family or smaller group.",
            price: "2.200 RSD/person",
            badges: ["event", "house"],
          },
        ],
      },
    ],
  },
};

export function getMenu(locale: Locale): MenuCopy {
  return menuCopy[locale];
}
