import { checkAuhtUser } from "./utils/auth";

// Obtenemos la URL actual
const path = window.location.pathname;

// Si está en zona admin → verificar que sea admin
if (path.includes("/admin/")) {
    checkAuhtUser(
        "/src/pages/auth/login/login.html",
        "/src/pages/client/home/home.html",
        "admin"
    );
}


if (path.includes("/client/")) {
    checkAuhtUser(
        "/src/pages/auth/login/login.html",
        "/src/pages/admin/home/home.html",
        "client"
    );
}