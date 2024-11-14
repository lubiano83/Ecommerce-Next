// app/api/auth/logout/route.js (Next.js API Route)
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    try {
        // Obtiene el token desde el body de la solicitud
        const { token } = await request.json();

        // Llama a la ruta de logout en el backend de Express
        const response = await fetch("http://localhost:8080/api/auth/users", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }), // Envía el token en el cuerpo
            credentials: 'include', // Asegura que las cookies se envíen
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: response.status });
        }

        return NextResponse.json({ message: "Sesión cerrada con éxito" }, { status: 200 });
    } catch (error) {
        console.error("Error en la API de Next.js al cerrar sesión:", error.message);
        return NextResponse.json({ message: "Error al cerrar sesión", error: error.message }, { status: 500 });
    }
}