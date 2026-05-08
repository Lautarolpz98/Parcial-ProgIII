import { checkAuhtUser, logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";


const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;

buttonLogout?.addEventListener("click", () => {
  logout();
});

const container = document.getElementById("contenedor-productos") as HTMLElement;

/* ---------------- RENDER PRODUCTS ---------------- */

const renderProducts = () => {
  if (!container) return;

  container.innerHTML = "";

  const productsToShow = PRODUCTS.filter(p => p.disponible);

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

const categoryContainer = document.getElementById("lista-categorias") as HTMLElement;

const renderCategories = () => {
  if (!categoryContainer) return;

  categoryContainer.innerHTML = "";

  const categories = getCategories();

  categories.forEach(cat => {
    const li = document.createElement("li");

    li.textContent = cat.nombre;
    li.classList.add("category-item");

    // opcional para filtro después
    li.dataset.id = String(cat.id);

    categoryContainer.appendChild(li);
  });
};



const initPage = () => {
  console.log("inicio de pagina");

  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );

  // 🔥 IMPORTANTE: render después de validar auth
  renderCategories();
  renderProducts();
};

initPage();