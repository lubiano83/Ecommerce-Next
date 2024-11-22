"use client";
import React, { useState } from "react";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import Button from "../../Button";
import { useRouter } from "next/navigation";

const ProfileUpdate = ({ id, initialData = {} }) => {
  const { isDarkMode } = useDarkMode();
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    phone: initialData.phone || "",
    region: initialData.address?.region || "",
    city: initialData.address?.city || "",
    street: initialData.address?.street || "",
    number: initialData.address?.number || "",
    images: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const data = new FormData();
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("phone", formData.phone);
      data.append("region", formData.region);
      data.append("city", formData.city);
      data.append("street", formData.street);
      data.append("number", formData.number);
  
      if (formData.images) {
        data.append("images", formData.images);
      } else {
        console.warn("No image file selected.");
      }
  
      // Verifica el contenido del FormData
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
  
      const response = await fetch(`/api/auth/users/${id}`, {
        method: "PATCH",
        body: data, // Enviar el FormData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }
  
      alert("Usuario actualizado con éxito");
      router.push(`/views/auth/profile`);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al actualizar el usuario.");
    } finally {
      setIsSubmitting(false);
    }
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
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Ingresa tu apellido.."
          value={formData.last_name}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
          required
        />
        <div className="w-full flex items-center gap-2 rounded-xl pl-2 h-8 text-gray-700 bg-white">
          <span className="text-gray-500">+56</span>
          <input
            type="text"
            name="phone"
            placeholder="Ingresa tu número (ej: 912345678)"
            value={formData.phone.replace("+56", "")}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Solo permite números
              if (inputValue.length <= 9) {
                setFormData((prevData) => ({
                  ...prevData,
                  phone: `+56${inputValue}`,
                }));
              }
            }}
            onBlur={(e) => {
              const inputValue = e.target.value.replace("+56", "");
              if (inputValue.length !== 9) {
                alert("El número debe tener exactamente 9 dígitos.");
                setFormData((prevData) => ({
                  ...prevData,
                  phone: "+56", // Resetea al prefijo si el número no es válido
                }));
              }
            }}
            maxLength={9}
            className="flex-1 border-none focus:outline-none text-gray-700"
            required
          />
        </div>
        <input
          type="text"
          name="region"
          placeholder="Ingresa tu región.."
          value={formData.region}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Ingresa tu ciudad.."
          value={formData.city}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Ingresa tu calle.."
          value={formData.street}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Ingresa tu número.."
          value={formData.number}
          onChange={handleChange}
          className="w-full rounded-xl pl-2 h-8 text-gray-700"
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : "Aceptar"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileUpdate;