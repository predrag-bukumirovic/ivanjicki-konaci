import type { Locale } from "@/lib/i18n";

const baseReviews = [
  {
    name: "Jelena",
    date: "05/07/2024",
    source: "Booking.com",
    rating: 5,
    quote: {
      sr: "Predivna lokacija, jako ljubazno osoblje, hrana savršena! Čisto, uredno, velika terasa sa predivnim pogledom, mir, tišina... Sve u svemu, prelepo!",
      en: "Beautiful location, very kind staff, perfect food! Clean, tidy, a large terrace with a beautiful view, peace and quiet... All in all, wonderful!",
    },
  },
  {
    name: "Čedomir",
    date: "12/05/2023",
    source: "Booking.com",
    rating: 5,
    quote: {
      sr: "Mirna i prelepa okolina, ko zeli da se stvarno odmori ovo je pravo mesto za to. Osoblje sjajno, dobra hrana, velike porcije i opuštena atmosfera.",
      en: "A peaceful and beautiful setting. If you really want to rest, this is the right place. The staff are wonderful, the food is good and the portions are generous.",
    },
  },
  {
    name: "Daniel",
    date: "08/09/2025",
    source: "Booking.com",
    rating: 4.5,
    quote: {
      sr: "Predivna lokacija, voleo bih da sam imao više vremena da ostanem.",
      en: "A stunning location I wish I had more time to stay",
    },
  },
  {
    name: "Ziko",
    date: "04/03/2025",
    source: "Booking.com",
    rating: 4.5,
    quote: {
      sr: "Već sam boravio ovde i zato smo se vratili. Lokacija i pogled su izuzetni, a Biljana se svaki put pobrine za sve što nam treba.",
      en: "I have stayed here previously hence the reason we came back. The location and the view is exceptional. Every time we stay there Biljana looks after all our needs, she is very professional and a pleasure to deal with",
    },
  },
  {
    name: "Jelena",
    date: "18/08/2024",
    source: "Booking.com",
    rating: 5,
    quote: {
      sr: "Predivno okruženje, prijatno osoblje, čistoća na visokom nivou.",
      en: "Beautiful surroundings, pleasant staff and a very high standard of cleanliness.",
    },
  },
  {
    name: "Milan",
    date: "27/08/2023",
    source: "Booking.com",
    rating: 4.5,
    quote: {
      sr: "Objekat je veoma čist i lepo održavan, osoblje je ljubazno i predusretljivo. Bazen je izuzetno čist, a hrana odlična.",
      en: "The property is very clean and well maintained, staff are friendly and helpful. The swimming pool is one of the cleanest I have ever seen. The food is excellent and pretty much you feel like home. Excellent view from the entire property.",
    },
  },
  {
    name: "Matt",
    date: "22/09/2025",
    source: "Booking.com",
    rating: 5,
    quote: {
      sr: "Hotel je u prelepom okruženju izvan grada. Ima dovoljno parkinga, divno uređeno imanje, čist bazen, odličnu hranu i spektakularan pogled sa terase.",
      en: "The hotel is in a beautiful setting outside of town. It is not really possible to reach without transportation. There is plenty of parking. The grounds were a beautiful orchard hillside. There are nice public porches and a super clear pool. There are pleasant walks around the hotel area. The food and service were terrific at diner. There was a great selection of Serbian and international dishes. The view from the patio is spectacular.",
    },
  },
  {
    name: "Mads",
    date: "04/07/2025",
    source: "Booking.com",
    rating: 5,
    quote: {
      sr: "Divna lokacija sa prelepim pogledom. Ima mira i tišine za opuštanje, a osoblje je veoma ljubazno i predusretljivo.",
      en: "A wonderful location with a beautiful view. There is peace and quiet for relaxation, and the staff are very friendly and welcoming.",
    },
  },
  {
    name: "Mladen",
    date: "23/09/2023",
    source: "Booking.com",
    rating: 5,
    quote: {
      sr: "Osećali smo se kao kod kuće. Doputovali smo motorom, napravili lepe izlete i rado bismo se vratili.",
      en: "We felt at home. We arrived by Harley and visited two concerts in Guca. Definitely recommended. We made lovely trips and would gladly come back.",
    },
  },
] as const;

export function getBookingReviews(locale: Locale = "sr") {
  return baseReviews.map((review) => ({
    name: review.name,
    date: review.date,
    source: review.source,
    rating: review.rating,
    quote: review.quote[locale],
  }));
}

export const bookingReviews = getBookingReviews();
