const categories = [
  {
    id: "plants",
    name: "Plants",
    tags: ["products", "inspirations"],
    count: 147,
    image: require("../assets/icons/plants.png")
  },
  {
    id: "seeds",
    name: "Seeds",
    tags: ["products", "shop"],
    count: 16,
    image: require("../assets/icons/seeds.png")
  },
  {
    id: "flowers",
    name: "Flowers",
    tags: ["products", "inspirations"],
    count: 68,
    image: require("../assets/icons/flowers.png")
  },
  {
    id: "sprayers",
    name: "Sprayers",
    tags: ["products", "shop"],
    count: 17,
    image: require("../assets/icons/sprayers.png")
  },
  {
    id: "pots",
    name: "Pots",
    tags: ["products", "shop"],
    count: 47,
    image: require("../assets/icons/pots.png")
  },
  {
    id: "fertilizers",
    name: "fertilizers",
    tags: ["products", "shop"],
    count: 47,
    image: require("../assets/icons/fertilizers.png")
  }
];

const products = [
  {
    id: 1,
    name: "16 Best Plants That Thrive In Your Bedroom",
    description:
      "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
    tags: ["Interior", "27 m²", "Ideas"],
    images: [
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      // showing only 3 images, show +6 for the rest
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png")
    ]
  }
];

const explore = [
  // images
  require("../assets/images/explore_1.png"),
  require("../assets/images/explore_2.png"),
  require("../assets/images/explore_3.png"),
  require("../assets/images/explore_4.png"),
  require("../assets/images/explore_5.png"),
  require("../assets/images/explore_6.png")
];

const profile = {
  username: "react-ui-kit",
  location: "Europe",
  email: "contact@react-ui-kit.com",
  avatar: require("../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false
};

const ufs = [
      {
        "id": 11,
        "uf": "RO",
        "name": "Rondônia",
        "latitude": -10.83,
        "longitude": -63.34
      },
{
  "id": 12,
    "uf": "AC",
    "name": "Acre",
    "latitude": -8.77,
    "longitude": -70.55
},
{
  "id": 13,
    "uf": "AM",
    "name": "Amazonas",
    "latitude": -3.47,
    "longitude": -65.1
},
{
  "id": 14,
    "uf": "RR",
    "name": "Roraima",
    "latitude": 1.99,
    "longitude": -61.33
},
{
  "id": 15,
    "uf": "PA",
    "name": "Pará",
    "latitude": -3.79,
    "longitude": -52.48
},
{
  "id": 16,
    "uf": "AP",
    "name": "Amapá",
    "latitude": 1.41,
    "longitude": -51.77
},
{
  "id": 17,
    "uf": "TO",
    "name": "Tocantins",
    "latitude": -9.46,
    "longitude": -48.26
},
{
  "id": 21,
    "uf": "MA",
    "name": "Maranhão",
    "latitude": -5.42,
    "longitude": -45.44
},
{
  "id": 22,
    "uf": "PI",
    "name": "Piauí",
    "latitude": -6.6,
    "longitude": -42.28
},
{
  "id": 23,
    "uf": "CE",
    "name": "Ceará",
    "latitude": -5.2,
    "longitude": -39.53
},
{
  "id": 24,
    "uf": "RN",
    "name": "Rio Grande do Norte",
    "latitude": -5.81,
    "longitude": -36.59
},
{
  "id": 25,
    "uf": "PB",
    "name": "Paraíba",
    "latitude": -7.28,
    "longitude": -36.72
},
{
  "id": 26,
    "uf": "PE",
    "name": "Pernambuco",
    "latitude": -8.38,
    "longitude": -37.86
},
{
  "id": 27,
    "uf": "AL",
    "name": "Alagoas",
    "latitude": -9.62,
    "longitude": -36.82
},
{
  "id": 28,
    "uf": "SE",
    "name": "Sergipe",
    "latitude": -10.57,
    "longitude": -37.45
},
{
  "id": 29,
    "uf": "BA",
    "name": "Bahia",
    "latitude": -13.29,
    "longitude": -41.71
},
{
  "id": 31,
    "uf": "MG",
    "name": "Minas Gerais",
    "latitude": -18.1,
    "longitude": -44.38
},
{
  "id": 32,
    "uf": "ES",
    "name": "Espírito Santo",
    "latitude": -19.19,
    "longitude": -40.34
},
{
  "id": 33,
    "uf": "RJ",
    "name": "Rio de Janeiro",
    "latitude": -22.25,
    "longitude": -42.66
},
{
  "id": 35,
    "uf": "SP",
    "name": "São Paulo",
    "latitude": -22.19,
    "longitude": -48.79
},
{
  "id": 41,
    "uf": "PR",
    "name": "Paraná",
    "latitude": -24.89,
    "longitude": -51.55
},
{
  "id": 42,
    "uf": "SC",
    "name": "Santa Catarina",
    "latitude": -27.45,
    "longitude": -50.95
},
{
  "id": 43,
    "uf": "RS",
    "name": "Rio Grande do Sul",
    "latitude": -30.17,
    "longitude": -53.5
},
{
  "id": 50,
    "uf": "MS",
    "name": "Mato Grosso do Sul",
    "latitude": -20.51,
    "longitude": -54.54
},
{
  "id": 51,
    "uf": "MT",
    "name": "Mato Grosso",
    "latitude": -12.64,
    "longitude": -55.42
},
{
  "id": 52,
    "uf": "GO",
    "name": "Goiás",
    "latitude": -15.98,
    "longitude": -49.86
},
{
  "id": 53,
    "uf": "DF",
    "name": "Distrito Federal",
    "latitude": -15.83,
    "longitude": -47.86
}
];
export { categories, explore, products, profile, ufs };
