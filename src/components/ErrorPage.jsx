import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="space-y-8">
      <h1 className="text-center text-6xl mt-20 font-extrabold text-blue-900">
        CRM - Clientes
      </h1>
      <p className="text-center">Hubo un error</p>
      <p className="text-center">{error.message || error.statusText}</p>
    </div>
  );
};
