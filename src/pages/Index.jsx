import React from "react";
import { useLoaderData } from "react-router-dom";
import { obtenerClientes } from "../../helpers/clientes";
import { Cliente } from "../components/Cliente";

export function loader() {
  return obtenerClientes();
}

export const Index = () => {
  const datos = useLoaderData();
  return (
    <>
      <h1 className="text-4xl font-black text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus Clientes</p>

      {datos.length ? (
        <table className="w-full shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay clientes aun</p>
      )}
    </>
  );
};
