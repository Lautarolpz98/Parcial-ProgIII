import type { IUser } from "../../../types/IUser";
import { getUsers, saveUsers } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();


    const users = getUsers();


    const yaExiste = users.some((u) => u.email === email);
    if (yaExiste) {
        alert("Ya existe un usuario con ese email.");
        return;
    }


    const nuevoUsuario: IUser = {
        email,
        password,
        role: "client",
        loggedIn: false,
    };


    users.push(nuevoUsuario);
    saveUsers(users);

    alert("¡Registro exitoso! Redirigiendo al login...");
    navigate("/src/pages/auth/login/login.html");
});