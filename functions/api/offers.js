const MOCK_OFFERS = [
  {
    id: 1,
    title: "2-sobno stanovanje Šiška",
    price: 215000,
    area_m2: 52,
    city: "Ljubljana",
    district: "Šiška",
    source: "nepremicnine",
    url: "https://primer-oglasa-1"
  },
  {
    id: 2,
    title: "3-sobno stanovanje Bežigrad",
    price: 285000,
    area_m2: 68,
    city: "Ljubljana",
    district: "Bežigrad",
    source: "bolha",
    url: "https://primer-oglasa-2"
  },
  {
    id: 3,
    title: "Garsonjera Center",
    price: 165000,
    area_m2: 32,
    city: "Ljubljana",
    district: "Center",
    source: "nepremicnine",
    url: "https://primer-oglasa-3"
  },
  {
    id: 4,
    title: "4-sobno stanovanje Vič",
    price: 385000,
    area_m2: 95,
    city: "Ljubljana",
    district: "Vič",
    source: "bolha",
    url: "https://primer-oglasa-4"
  },
  {
    id: 5,
    title: "2-sobno stanovanje Moste",
    price: 189000,
    area_m2: 48,
    city: "Ljubljana",
    district: "Moste",
    source: "nepremicnine",
    url: "https://primer-oglasa-5"
  },
  {
    id: 6,
    title: "3-sobno stanovanje Maribor",
    price: 175000,
    area_m2: 72,
    city: "Maribor",
    district: "Center",
    source: "bolha",
    url: "https://primer-oglasa-6"
  }
];

export async function onRequest(context) {
  return new Response(JSON.stringify(MOCK_OFFERS), {
    headers: { "Content-Type": "application/json" }
  });
}
