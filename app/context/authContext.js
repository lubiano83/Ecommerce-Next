"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = Cookies.get('coderCookieToken');
        if (storedToken) {
            setToken(storedToken);
        } else {
            userLogout();
        }

        const intervalId = setInterval(() => {
            const currentToken = Cookies.get('coderCookieToken');
            if (!currentToken && token) {
                userLogout();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [token]);

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

    const userLogin = async (e) => {
        e.preventDefault();
    
        const formData = {
            email: formValues.email,
            password: formValues.password,
        };
    
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el inicio de sesión');
            }
    
            const result = await response.json();
            
            Cookies.set('coderCookieToken', result.token, {
                expires: 1,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });
            setToken(result.token);
            alert('Inicio de sesión exitoso');
            setFormValues({ email: '', password: '' });
            router.push("/");
        } catch (error) {
            alert(`Error al iniciar sesión: ${error.message}`);
        }
    };

    const userLogout = async () => {
        try {
            const tokenToUse = token || Cookies.get("coderCookieToken");

            const response = await fetch('/api/auth/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ token: tokenToUse }),
            });

            if (response.ok) {
                setToken(null);
                Cookies.remove("coderCookieToken");
                router.push('/');
            } else {
                const errorData = await response.json();
                alert(`Error al cerrar sesión: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("Hubo un problema al intentar cerrar sesión.");
        }
    };

    return (
        <AuthContext.Provider value={{ userRegister, userLogin, userLogout, handleChange, formValues, token }}>
            {children}
        </AuthContext.Provider>
    );
};