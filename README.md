# 🍔 Food Store 🍕

Aplicación frontend de una tienda de comida desarrollada con HTML, CSS y TypeScript sobre Vite.

## Descripción

Food Store es un e-commerce de productos gastronómicos que permite a los usuarios explorar un catálogo, filtrar por categoría, buscar productos y gestionar un carrito de compras con persistencia en localStorage.

El proyecto cuenta con un sistema de autenticación con guard de rutas que protege las vistas según el rol del usuario:
- **Cliente** → accede al catálogo y al carrito
- **Administrador** → accede al panel de administración

Un cliente no puede acceder a la vista de admin, y viceversa. Si el usuario no está autenticado, es redirigido al login.

## Funcionalidades

- 🔐 Login con guard de rutas por rol (client / admin)
- 📦 Catálogo de productos renderizado dinámicamente
- 🔍 Búsqueda de productos por nombre en tiempo real
- 🗂 Filtrado por categoría desde el menú lateral
- 🛒 Carrito de compras con persistencia en localStorage
- ➕➖ Sumar y restar cantidades por producto
- 🗑 Eliminar productos individuales o vaciar el carrito completo
- 💰 Total y subtotales actualizados dinámicamente
- 🔢 Badge contador en el ícono del carrito

## Tecnologías

- HTML5
- CSS3
- TypeScript
- Vite

## Instrucciones para ejecutarlo

### 1. Clonar el repositorio

```bash
git clone https://github.com/Lautarolpz98/Parcial-ProgIII.git
```

### 2. Instalar dependencias

```bash
pnpm install
```

> Si no tenés pnpm: `npm install -g pnpm`

### 3. Levantar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`


## Estructura del proyecto

```
src/
├── data/
│   └── data.ts              ← productos y categorías
├── pages/
│   ├── auth/
│   │   ├── login/           ← página de login
│   │   └── registro/        ← página de registro
│   ├── admin/
│   │   └── home/            ← panel de administración (solo rol admin)
│   ├── client/
│   │   └── home/            ← catálogo de productos (solo rol client)
│   └── cart/                ← vista del carrito
├── types/
│   ├── product.ts           ← interfaces Product
│   ├── category.ts          ← interface ICategory
│   └── cart.ts              ← type CartItem
└── utils/
    ├── auth.ts              ← guard de rutas y autenticación
    ├── cart.ts              ← lógica del carrito (localStorage)
    └── localStorage.ts      ← manejo de usuarios en localStorage
```

## Autor

Lautaro Lopez  
[LinkedIn](https://www.linkedin.com/in/lautaro-lopez-b56aa7305/)