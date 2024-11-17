"use client";
import { useEffect } from "react";

export default function Error ({ error }) {

    useEffect(() => {
        console.log(error);
    }, [error])

    return (
        <div className="flex flex-col w-full justify-center items-center bg-white h-full text-gray-700 p-8 gap-4">
            Algo salio mal..
        </div>
    )
};