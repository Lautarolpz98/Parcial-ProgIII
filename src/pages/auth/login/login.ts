import type { IUser } from "../../../types/IUser";
import { getUsers, saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // Buscamos en el array de usuarios registrados
  const users = getUsers();
  const usuarioEncontrado = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!usuarioEncontrado) {
    alert("Email o contraseña incorrectos.");
    return;
  }


  const usuarioActivo: IUser = { ...usuarioEncontrado, loggedIn: true };
  saveUser(usuarioActivo);

  // Redirigimos según el rol
  if (usuarioActivo.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});