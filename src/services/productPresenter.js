const CATEGORY_LABELS = {
  beauty: "Beleza",
  fragrances: "Perfumes",
  furniture: "Moveis",
  groceries: "Mercado",
  "home-decoration": "Decoracao",
  "kitchen-accessories": "Cozinha",
  laptops: "Notebooks",
  "mens-shirts": "Camisas masculinas",
  "mens-shoes": "Calcados masculinos",
  "mens-watches": "Relogios masculinos",
  "mobile-accessories": "Acessorios para celular",
  motorcycle: "Moto",
  "skin-care": "Cuidados com a pele",
  smartphones: "Celulares",
  "sports-accessories": "Esportes",
  sunglasses: "Oculos de sol",
  tablets: "Tablets",
  tops: "Blusas",
  vehicle: "Veiculos",
  "womens-bags": "Bolsas femininas",
  "womens-dresses": "Vestidos femininos",
  "womens-jewellery": "Joias femininas",
  "womens-shoes": "Calcados femininos",
  "womens-watches": "Relogios femininos"
};

const TITLE_TRANSLATIONS = {
  "Essence Mascara Lash Princess": "Mascara de cilios Lash Princess",
  "Eyeshadow Palette with Mirror": "Paleta de sombras com espelho",
  "Powder Canister": "Pote de po facial",
  "Red Lipstick": "Batom vermelho",
  "Women Beauty Cream": "Creme de beleza feminino",
  "Calvin Klein CK One": "Perfume Calvin Klein CK One",
  "Chanel Coco Noir Eau De": "Perfume Chanel Coco Noir",
  "Dior J'adore": "Perfume Dior J'adore",
  "Dolce Shine Eau de": "Perfume Dolce Shine",
  "Gucci Bloom Eau de": "Perfume Gucci Bloom",
  "Annibale Colombo Bed": "Cama Annibale Colombo",
  "Annibale Colombo Sofa": "Sofa Annibale Colombo",
  "Bedside Table African Cherry": "Mesa de cabeceira cerejeira",
  "Floor Lamp": "Luminaria de piso",
  "Knoll Saarinen Executive Chair": "Cadeira executiva Saarinen",
  "Apple": "Maca",
  "Beef Steak": "Bife bovino",
  "Cat Food": "Racao para gato",
  "Chicken Meat": "Carne de frango",
  "Cooking Oil": "Oleo de cozinha",
  "Cucumber": "Pepino",
  "Dog Food": "Racao para cachorro",
  "Eggs": "Ovos",
  "Fish Steak": "Posta de peixe",
  "Green Bell Pepper": "Pimentao verde",
  "Green Chili Pepper": "Pimenta verde",
  "Honey Jar": "Pote de mel",
  "Ice Cream": "Sorvete",
  "Juice": "Suco",
  "Kiwi": "Kiwi",
  "Milk": "Leite",
  "Mulberry": "Amora",
  "Nescafe Coffee": "Cafe Nescafe",
  "Potatoes": "Batatas",
  "Protein Powder": "Proteina em po",
  "Rice": "Arroz",
  "Soft Drinks": "Refrigerantes",
  "Strawberry": "Morango",
  "Tissue Paper Box": "Caixa de lencos",
  "Water": "Agua",
  "Decoration Swing": "Balanco decorativo",
  "Family Tree Photo Frame": "Porta-retrato arvore da familia",
  "House Showpiece Plant": "Planta decorativa",
  "Plant Pot": "Vaso de planta",
  "Table Lamp": "Abajur",
  "Laptop": "Notebook",
  "Smartphone": "Celular"
};

const WORD_TRANSLATIONS = [
  ["Women", "Feminino"],
  ["Mens", "Masculino"],
  ["Men", "Masculino"],
  ["Shirt", "Camisa"],
  ["Shirts", "Camisas"],
  ["Shoes", "Calcados"],
  ["Shoe", "Calcado"],
  ["Watch", "Relogio"],
  ["Watches", "Relogios"],
  ["Bag", "Bolsa"],
  ["Bags", "Bolsas"],
  ["Dress", "Vestido"],
  ["Dresses", "Vestidos"],
  ["Jewellery", "Joias"],
  ["Sunglasses", "Oculos de sol"],
  ["Accessories", "Acessorios"],
  ["Mobile", "Celular"],
  ["Kitchen", "Cozinha"],
  ["Table", "Mesa"],
  ["Chair", "Cadeira"],
  ["Lamp", "Luminaria"],
  ["Cream", "Creme"],
  ["Lipstick", "Batom"],
  ["Palette", "Paleta"],
  ["Mirror", "Espelho"],
  ["Powder", "Po"],
  ["Coffee", "Cafe"],
  ["Oil", "Oleo"],
  ["Food", "Alimento"],
  ["Meat", "Carne"],
  ["Fish", "Peixe"]
];

export function getCategoryLabel(slug) {
  return CATEGORY_LABELS[slug] || humanizeSlug(slug);
}

export function presentCategory(category) {
  const slug = typeof category === "string" ? category : category.slug;

  return {
    slug,
    name: getCategoryLabel(slug)
  };
}

export function presentProduct(product) {
  const title = translateTitle(product.title);

  return {
    ...product,
    title,
    categoryLabel: getCategoryLabel(product.category),
    description: translateDescription(product, title)
  };
}

function translateTitle(title = "") {
  if (TITLE_TRANSLATIONS[title]) {
    return TITLE_TRANSLATIONS[title];
  }

  return WORD_TRANSLATIONS.reduce(
    (translated, [from, to]) => translated.replace(new RegExp(`\\b${from}\\b`, "gi"), to),
    title
  );
}

function translateDescription(product, title) {
  const brand = product.brand ? ` da marca ${product.brand}` : "";
  const category = getCategoryLabel(product.category).toLowerCase();

  return `${title}${brand}, indicado para a categoria de ${category}. Produto cadastrado no catalogo MiniStock com estoque, preco e avaliacao sincronizados pela DummyJSON.`;
}

function humanizeSlug(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
