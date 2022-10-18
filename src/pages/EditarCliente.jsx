import {
  useLoaderData,
  Form,
  useNavigate,
  useActionData,
  redirect,
} from "react-router-dom";
import { actualizarCliente, obtenerCliente } from "../../helpers/clientes";
import Error from "../components/Error";
import Formulario from "../components/Formulario.";

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);
  if (!cliente) {
    throw new Response("", {
      status: 404,
      statusText: "El cliente no fue encontrado",
    });
  }
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");
  const errores = [];

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    errores.push("El email no es valido");
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await actualizarCliente(params.clienteId, datos);
  return redirect("/");
}

export const EditarCliente = () => {
  const clienteData = useLoaderData();
  const errores = useActionData();
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-4xl font-black text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuación podrás modificar los datos del cliente{" "}
        <span className="font-bold text-md">{clienteData.nombre}</span>
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
          <Formulario cliente={clienteData} />
          <input
            type="submit"
            className="mt-5 bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value='Guardar Cambios'
          />
        </Form>
      </div>
    </>
  );
};
