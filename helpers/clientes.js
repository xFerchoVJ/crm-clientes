export const obtenerClientes = async () => {
  const url = import.meta.env.VITE_API_URL;
  const respuesta = await fetch(url, {
    method: "GET",
  });
  const resultado = await respuesta.json();
  return resultado;
};

export async function agregarCliente(data) {
  const url = import.meta.env.VITE_API_URL;
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await respuesta.json();
  } catch (error) {
    console.error(error);
  }
}

export const obtenerCliente = async (id) => {
  const url = `${import.meta.env.VITE_API_URL}/${id}`;
  const respuesta = await fetch(url, {
    method: "GET",
  });
  const resultado = await respuesta.json();
  return resultado;
};

export const actualizarCliente = async (id, data) => {
  const url = `${import.meta.env.VITE_API_URL}/${id}`;
  try {
    const respuesta = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await respuesta.json();
  } catch (error) {
    console.error(error);
  }
};

export const eliminarCliente = async (id) => {
  const url = `${import.meta.env.VITE_API_URL}/${id}`;
  try {
    const respuesta = await fetch(url, {
      method: "DELETE",
    });
    await respuesta.json();
  } catch (error) {
    console.error("Hubo un error al eliminar el cliente", error);
  }
};
