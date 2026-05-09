import { checkAuhtUser, logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart, getCart } from "../../../utils/cart";

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => logout());

const container = document.getElementById("contenedor-productos") as HTMLElement;
const categoryContainer = document.getElementById("lista-categorias") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const searchForm = document.querySelector(".search") as HTMLFormElement;
const cartBadge = document.getElementById("cart-badge") as HTMLSpanElement;

let selectedCategoryId: number | null = null;
let searchTerm: string = "";

const updateCartBadge = () => {
  const cart = getCart();
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  if (totalItems > 0) {
    cartBadge.textContent = String(totalItems);
    cartBadge.classList.add("visible");
  } else {
    cartBadge.classList.remove("visible");
  }
};

const renderProducts = () => {
  if (!container) return;

  container.innerHTML = "";

  let productsToShow = PRODUCTS.filter(p => p.disponible);

  if (selectedCategoryId !== null) {
    productsToShow = productsToShow.filter(p =>
      p.categorias.some(c => c.id === selectedCategoryId)
    );
  }

  if (searchTerm.trim() !== "") {
    productsToShow = productsToShow.filter(p =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (productsToShow.length === 0) {
    container.innerHTML = `<p class="no-results">No se encontraron productos 😕</p>`;
    return;
  }

  productsToShow.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="/assets/${product.imagen}" alt="${product.nombre}" />
      <h3>${product.nombre}</h3>
      <p>${product.descripcion}</p>
      <strong>$${product.precio.toFixed(2)}</strong>
      <button class="add-btn" data-id="${product.id}">
        Agregar al carrito
      </button>
    `;

    container.appendChild(card);
  });
};

container?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (!target.classList.contains("add-btn")) return;

  const id = Number(target.dataset.id);
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  addToCart({
    id: product.id,
    nombre: product.nombre,
    precio: product.precio,
    imagen: product.imagen,
  });

  updateCartBadge();

  target.textContent = "✅ Agregado";
  target.setAttribute("disabled", "true");

  setTimeout(() => {
    target.textContent = "Agregar al carrito";
    target.removeAttribute("disabled");
  }, 1200);
});

const renderCategories = () => {
  if (!categoryContainer) return;

  categoryContainer.innerHTML = "";

  const liTodos = document.createElement("li");
  liTodos.textContent = "Todos";
  liTodos.classList.add("category-item", "active");
  liTodos.addEventListener("click", () => {
    selectedCategoryId = null;
    setActiveCategory(liTodos);
    renderProducts();
  });
  categoryContainer.appendChild(liTodos);

  getCategories().forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat.nombre;
    li.classList.add("category-item");
    li.dataset.id = String(cat.id);

    li.addEventListener("click", () => {
      selectedCategoryId = cat.id;
      setActiveCategory(li);
      renderProducts();
    });

    categoryContainer.appendChild(li);
  });
};

const setActiveCategory = (activeLi: HTMLElement) => {
  document.querySelectorAll(".category-item").forEach(el => el.classList.remove("active"));
  activeLi.classList.add("active");
};

searchInput?.addEventListener("input", () => {
  searchTerm = searchInput.value;
  renderProducts();
});

searchForm?.addEventListener("submit", (e) => e.preventDefault());

const initPage = () => {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );

  renderCategories();
  renderProducts();
  updateCartBadge();
};

initPage();