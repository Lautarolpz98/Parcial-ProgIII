import { getCart, getTotal } from "../../utils/cart";


const container = document.getElementById("cart-container") as HTMLElement;
const totalEl = document.getElementById("cart-total") as HTMLElement;

const renderCart = () => {
    const cart = getCart();

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>El carrito está vacío 😢</p>";
        totalEl.textContent = "$0.00";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
      <h3>${item.nombre}</h3>
      <p>Precio: $${item.precio}</p>
      <p>Cantidad: ${item.cantidad}</p>
      <strong>Subtotal: $${item.precio * item.cantidad}</strong>
    `;

        container.appendChild(div);
    });

    totalEl.textContent = `$${getTotal().toFixed(2)}`;
};

renderCart();