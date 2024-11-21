"use client";
import React, { useEffect, useState } from "react";
import { useDarkMode } from "@/app/hooks/useDarkMode";
import Button from "../../Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/app/views/loading";
import Error from "@/app/views/error";
import ProfileImage from "./ProfileImage";
import { useCapitalize } from "@/app/hooks/useCapitalize";

const ProfileData = ({ id }) => {
  const { isDarkMode } = useDarkMode();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const { capitalize } = useCapitalize();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/users/${id}`,
          { cache: "no-cache" }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del perfil");
        }

        const data = await response.json();
        setProfileData(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfileData();
  }, [id]);

  const volver = () => {
    router.push("/");
  };

  if (error) {
    return <Error/>
  }

  if (!profileData || !profileData.user) {
    return <Loading/>
  }

  const { user } = profileData;

  return (
    <div
      className={`min-w-72 p-8 gap-4 rounded-3xl flex flex-col justify-center items-center ${
        isDarkMode ? "bg-orange-700" : "bg-green-700"
      } bg-opacity-25`}
    >
      <h1
        className={`text-2xl underline ${
          isDarkMode ? "text-orange-700" : "text-green-700"
        }`}
      >
        Perfil de Usuario
      </h1>
      <div className="flex justify-center items-center flex-wrap gap-4">
        <ProfileImage imageUrl={user.images ?? "/user-svgrepo-com.svg"} />
        <div className="flex flex-col gap-0.5 text-sm">
          <p>
            <strong>Id:</strong> {user._id}
          </p>
          <p>
            <strong>Nombre:</strong> {user.first_name} {user.last_name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Región:</strong> {capitalize(user.address?.region)}
          </p>
          <p>
            <strong>Ciudad:</strong> {capitalize(user.address?.city)}
          </p>
          <p>
            <strong>Calle:</strong> {capitalize(user.address?.street)}
          </p>
          <p>
            <strong>Número:</strong> {user.address?.number}
          </p>
          <p>
            <strong>Creación:</strong>{" "}
            {new Date(user.createdAt || "").toDateString()}
          </p>
          <p>
            <strong>Actualización:</strong>{" "}
            {new Date(user.updatedAt || "").toDateString()}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button handleClick={volver}>Volver</Button>
        <Link href={`/views/auth/profile/update`}>
          <Button>Editar</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileData;