import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const userData = await request.json();

        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error en la API de Next.js:", error.message);
        return NextResponse.json({ message: "Error al registrar un usuario", error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error en la API de Next.js:", error.message);
        return NextResponse.json({ message: "Error al registrar un usuario", error: error.message }, { status: 500 });
    }
}