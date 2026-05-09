import { getCart, saveCart, getTotal } from "../../utils/cart";

const container = document.getElementById("cart-container") as HTMLElement;
const totalEl = document.getElementById("cart-total") as HTMLElement;
const btnClear = document.getElementById("btn-clear") as HTMLButtonElement;

const renderCart = () => {
    const cart = getCart();

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-cart">El carrito está vacío 😢</p>`;
        totalEl.textContent = "$0.00";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.dataset.id = String(item.id);

        div.innerHTML = `
      <!-- Info -->
      <div class="cart-item-info">
        <h3>${item.nombre}</h3>
        <span class="item-price">Precio unitario: $${item.precio.toFixed(2)}</span>
        <span class="item-subtotal">Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</span>
      </div>

      <!-- Controles de cantidad -->
      <div class="cart-item-controls">
        <button class="btn-qty btn-minus" data-id="${item.id}">−</button>
        <span class="item-qty">${item.cantidad}</span>
        <button class="btn-qty btn-plus" data-id="${item.id}">+</button>
      </div>

      <!-- Eliminar -->
      <button class="btn-delete" data-id="${item.id}" title="Eliminar">🗑</button>
    `;

        container.appendChild(div);
    });

    updateTotal();
};

const updateTotal = () => {
    totalEl.textContent = `$${getTotal().toFixed(2)}`;
};

const changeQuantity = (id: number, delta: number) => {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.cantidad += delta;

    // Si la cantidad llega a 0, eliminamos el item
    if (item.cantidad <= 0) {
        removeItem(id);
        return;
    }

    saveCart(cart);
    renderCart();
};

const removeItem = (id: number) => {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
};

btnClear?.addEventListener("click", () => {
    saveCart([]);
    renderCart();
});

container.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset.id);

    if (target.classList.contains("btn-plus")) {
        changeQuantity(id, 1);
    } else if (target.classList.contains("btn-minus")) {
        changeQuantity(id, -1);
    } else if (target.classList.contains("btn-delete")) {
        removeItem(id);
    }
});

renderCart();