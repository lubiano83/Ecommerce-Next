"use client";
import Swal from "sweetalert2";

export const useAlerts = () => {
    const simpleAlert = (icon, title, text) => {
        Swal.fire({
            position: "center",
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 2000
        });
    };

    return { simpleAlert };
};