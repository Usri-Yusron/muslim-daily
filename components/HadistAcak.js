"use client";

import { useEffect, useState } from "react";

import Loader from "./ui/loader";

export default function Hadits() {
    const [hadits, setHadits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHadits = () => {
        setLoading(true);
        setError(null);

        fetch("https://api.myquran.com/v2/hadits/bm/acak")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.data) {
                    setHadits(data.data);
                } else {
                    throw new Error("Data tidak ditemukan");
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchHadits(); // 🔹 Ambil data saat pertama kali komponen dimuat

        const interval = setInterval(() => {
            console.log("fetching data baru....");
            fetchHadits()
        }, 90000)

        return () => clearInterval(interval)
    }, []);

    return (
        <div className="p-6 ">
            <h1 className="text-xl font-bold text-center mb-4">Hadits Acak</h1>

            {loading ? (
                <div className="mt-4 flex items-center justify-center">
                    <Loader />
                </div>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="text-gray-800">
                    <p className="text-gray-700 italic">{hadits?.id}</p>
                </div>
            )}

            {/* 🔹 Tombol untuk mengambil hadits baru */}
            <button
                onClick={fetchHadits}
                className="mt-4 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Ambil Hadits Baru
            </button>
        </div>
    );
}
