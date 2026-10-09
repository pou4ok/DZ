// ============================================================
// ПРАКТИЧЕСКАЯ РАБОТА №4
// Массивы и методы map, filter, find
// ============================================================

// ------------------------------------------------------------
// 01. Подготовка тестового стенда
// ------------------------------------------------------------
const products = [
  { id: "p1", title: "Механическая клавиатура",   price: 8500,  category: "accessories", inStock: true,  rating: 4.8 },
  { id: "p2", title: "Игровой монитор 144Hz",     price: 24000, category: "displays",    inStock: false, rating: 4.6 },
  { id: "p3", title: "Беспроводная мышь",         price: 4200,  category: "accessories", inStock: true,  rating: 4.9 },
  { id: "p4", title: "USB-C хаб 7-in-1",          price: 3100,  category: "adapters",    inStock: true,  rating: 4.2 },
  { id: "p5", title: "Кронштейн для монитора",    price: 5600,  category: "accessories", inStock: false, rating: 4.7 }
];

console.log(`Загружено товаров: ${products.length}`);
console.log("=".repeat(60));

// ------------------------------------------------------------
// 02. Метод .map() — трансформация структуры
// ------------------------------------------------------------
console.log("\n=== 02. Метод .map() ===");

// Задача 1: массив названий товаров
const productTitles = products.map(item => item.title);
console.log("1. Названия товаров:", productTitles);

// Задача 2: скидка 15% + форматирование цены
const productsWithDiscount = products.map(item => ({
  ...item,
  discountPrice: item.price * 0.85,
  formattedPrice: `${Math.round(item.price * 0.85).toLocaleString("ru-RU")} ₽`
}));
console.log("2. Товары со скидкой 15%:");
productsWithDiscount.forEach(p =>
  console.log(`   ${p.title}: ${p.formattedPrice} (было ${p.price.toLocaleString("ru-RU")} ₽)`)
);

// Задача 3: эмуляция JSX-строк
const mockJsxList = products.map((item, index) =>
  `<li key="${item.id}" data-index="${index}">${item.title} - ${item.price}₽</li>`
);
console.log("3. Эмуляция JSX:", mockJsxList[0]);

// ------------------------------------------------------------
// 03. Метод .filter() — выборки и удаление
// ------------------------------------------------------------
console.log("\n=== 03. Метод .filter() ===");

// Задача 1: товары в наличии
const inStockOnly = products.filter(item => item.inStock);
console.log(`1. В наличии товаров: ${inStockOnly.length}`);
inStockOnly.forEach(p => console.log(`   • ${p.title}`));

// Задача 2: аксессуары дешевле 6000 ₽
const affordableAccessories = products.filter(
  item => item.category === "accessories" && item.price < 6000
);
console.log("2. Бюджетные аксессуары:", affordableAccessories.map(p => p.title));

// Задача 3: удаление товара по ID (эмуляция handleDelete)
const idToDelete = "p3";
const remainingProducts = products.filter(item => item.id !== idToDelete);
console.log(`3. Товары после удаления ${idToDelete}: ${remainingProducts.length} (было ${products.length})`);

// ------------------------------------------------------------
// 04. Метод .find() — поиск конкретного элемента
// ------------------------------------------------------------
console.log("\n=== 04. Метод .find() ===");

// Задача 1: поиск по точному ID
const targetId = "p4";
const foundProduct = products.find(item => item.id === targetId);
console.log(`Найден: ${foundProduct?.title ?? "Товар не найден"}`);

// Задача 2: поиск по предикату (рейтинг > 4.9)
const topRated = products.find(item => item.rating > 4.9);
console.log("Топ товар:", topRated?.title); // "Беспроводная мышь"

// Задача 3: поиск несуществующего товара
const missing = products.find(item => item.id === "p999");
console.log("Результат поиска несуществующего:", missing); // undefined

// ------------------------------------------------------------
// 05. Комбинирование: витрина «Хиты продаж»
// ------------------------------------------------------------
console.log("\n=== 05. Витрина «Хиты продаж» ===");

const showcaseProducts = products
  .filter(item => item.inStock && item.rating >= 4.5)
  .map(item => ({
    badge: "★ Хит",
    displayName: `${item.title} (${item.rating})`,
    finalPrice: `${item.price.toLocaleString("ru-RU")} ₽`
  }));

console.log("Витрина хитов:");
showcaseProducts.forEach(p =>
  console.log(`   ${p.badge} ${p.displayName} — ${p.finalPrice}`)
);

// ------------------------------------------------------------
// 06. Итоговое задание: CatalogManager
// ------------------------------------------------------------
console.log("\n=== 06. CatalogManager ===");

// 1. Поиск товара по ID
const getProductById = (list, id) => list.find(item => item.id === id);

// 2. Фильтрация по категории + опционально по наличию
const filterCatalog = (list, { category, onlyInStock = false } = {}) => {
  return list.filter(item => {
    const matchesCategory = category ? item.category === category : true;
    const matchesStock = onlyInStock ? item.inStock : true;
    return matchesCategory && matchesStock;
  });
};

// 3. Изменение цены товара по ID через .map()
const updateProductPrice = (list, id, newPrice) => {
  return list.map(item =>
    item.id === id ? { ...item, price: newPrice } : item
  );
};

// --- Проверка работы модуля ---
const activeAccessories = filterCatalog(products, {
  category: "accessories",
  onlyInStock: true
});

const updatedList = updateProductPrice(products, "p1", 7990);

console.log(`Аксессуары в наличии: ${activeAccessories.length} товара`);
activeAccessories.forEach(p => console.log(`   • ${p.title} — ${p.price} ₽`));

console.log(`Новая цена p1: ${getProductById(updatedList, "p1")?.price}`); // 7990

// Проверка иммутабельности — исходный массив не изменился
console.log(`Исходная цена p1 (не изменилась): ${getProductById(products, "p1")?.price}`); // 8500
