export type CartItem = {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    imagen?: string;
};

const CART_KEY = "cart";

/* ---------------- GET CART ---------------- */
export const getCart = (): CartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
};

/* ---------------- SAVE CART ---------------- */
export const saveCart = (cart: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

/* ---------------- ADD PRODUCT ---------------- */
export const addToCart = (product: {
    id: number;
    nombre: string;
    precio: number;
    imagen?: string;
}) => {
    const cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.cantidad += 1;
    } else {
        cart.push({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: 1,
            imagen: product.imagen,
        });
    }

    saveCart(cart);
};

/* ---------------- TOTAL ---------------- */
export const getTotal = (): number => {
    const cart = getCart();

    return cart.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );
};