import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NuevoCliente, action as nuevoCliente } from "./pages/NuevoCliente";
import { Index, loader as clientesLoader } from "./pages/Index";
import { ErrorPage } from "./components/ErrorPage";
import {
  EditarCliente,
  loader as obtenerCliente,
  action as editarClienteAction,
} from "./pages/EditarCliente";
import { action as eliminarClienteAction } from "./components/Cliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoCliente,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        loader: obtenerCliente,
        errorElement: <ErrorPage />,
        action: editarClienteAction,
      },
      {
        path: "clientes/:clienteId/eliminar",
        action: eliminarClienteAction
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
