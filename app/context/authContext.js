"use client";
import { createContext, useState } from "react";
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState(false);

    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const userRegister = async (e) => {
        e.preventDefault();
    
        const formData = {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            email: formValues.email,
            password: formValues.password,
        };
    
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro del usuario');
            }
    
            const result = await response.json();
            alert('Usuario registrado con éxito');
            setFormValues({ first_name: '', last_name: '', email: '', password: '' });
            router.push("/views/auth/login");
        } catch (error) {
            alert(`Error al registrar el usuario: ${error.message}`);
        }
    };

    const userLogin = async(email, password) => {
        try {
            if (!email || !password) {
                return alert("Por favor, ingresa tu correo electrónico y contraseña");
            }
    
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
    
            if (response.ok) {
                setToken(true);
                router.push('/');
            } else {
                const errorData = await response.json();
                alert(`Error al iniciar sesión: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message || error);
            alert("Hubo un problema al intentar iniciar sesión.");
        }
    };    

    const userLogout = async () => {
        try {
            const response = await fetch('/api/auth/users', {
                method: 'DELETE',
                credentials: 'include',
            });
    
            if (response.ok) {
                setToken(false);
                router.push('/');
            } else {
                const errorData = await response.json().catch(() => ({ message: "Error desconocido" }));
                alert(`Error al cerrar sesión: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message || error);
            alert("Hubo un problema al intentar cerrar sesión.");
        }
    };    

    return (
        <AuthContext.Provider value={{ userRegister, userLogin, userLogout, handleChange, formValues, token }}>
            {children}
        </AuthContext.Provider>
    );
};