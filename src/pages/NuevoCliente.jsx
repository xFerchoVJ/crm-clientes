import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario.";
import Error from "../components/Error";
import { agregarCliente } from "../../helpers/clientes";
export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");
  const errores = [];

  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    errores.push("El email no es valido");
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await agregarCliente(datos);

  return redirect("/");
}

export const NuevoCliente = () => {
  const navigate = useNavigate();
  const errores = useActionData();
  return (
    <>
      <h1 className="text-4xl font-black text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase hover:bg-blue-900 transition-all"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario />
          <input
            type="submit"
            className="mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Registrar cliente"
          />
        </Form>
      </div>
    </>
  );
};
