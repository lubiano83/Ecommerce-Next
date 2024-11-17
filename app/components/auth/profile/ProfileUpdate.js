"use client";
import React, { useState } from 'react';
import { useDarkMode } from '@/app/hooks/useDarkMode';
import Button from '../../Button';
import { useRouter } from 'next/navigation';

const ProfileUpdate = ({ id }) => {
  const { isDarkMode } = useDarkMode();
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    region: "",
    city: "",
    address: "",
    number: "",
    images: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Manejo de archivos para imágenes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const updatedData = { ...formData };

        if (formData.images) {
            const reader = new FileReader();
            reader.readAsDataURL(formData.images);
            await new Promise((resolve) => {
                reader.onload = () => {
                    updatedData.images = reader.result;
                    resolve();
                };
            });
        }

        console.log("ID enviado:", id);
        console.log("Datos enviados:", updatedData);

        const response = await fetch(`/api/auth/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error de la API:", errorData);
            alert(`Error: ${errorData.message}`);
            return;
        }

        alert("Usuario actualizado con éxito");
        router.push(`/views/auth/users/${id}`);
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un error al actualizar el usuario.");
    }
  };

  const volver = () => {
    router.push(`/views/auth/users/${id}`);
  };

  return (
    <div
      className={`w-1/3 min-w-72 p-8 gap-4 rounded-3xl flex flex-col justify-center items-center ${
        isDarkMode ? "bg-orange-700" : "bg-green-700"
      } bg-opacity-25`}
    >
      <h1
        className={`text-2xl underline ${
          isDarkMode ? "text-orange-700" : "text-green-700"
        }`}
      >
        Editar Usuario
      </h1>
      <form
        className="w-full flex flex-col justify-center items-center flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="images"
          placeholder="Ingresa una imagen.."
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="text"
          name="first_name"
          placeholder="Ingresa tu nombre.."
          value={formData.first_name}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Ingresa tu apellido.."
          value={formData.last_name}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="text"
          name="region"
          placeholder="Ingresa tu región.."
          value={formData.region}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="text"
          name="city"
          placeholder="Ingresa tu ciudad.."
          value={formData.city}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="text"
          name="address"
          placeholder="Ingresa tu dirección.."
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
        />
        <input
          type="text"
          name="number"
          placeholder="Ingresa tu número.."
          value={formData.number}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
        />
        <div className="flex gap-2">
          <Button handleClick={volver}>Volver</Button>
          <Button type="submit">Aceptar</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;