"use client";

import { useEffect, useState } from "react";
import Error from "./ui/error";
import Loader from "./ui/loader";

export default function SearchableDropdown({ setSelected }) {
    const [options, setOptions] = useState([]); // Data wilayah dari API
    const [search, setSearch] = useState(""); // Input pencarian
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // Untuk menampilkan dropdown
    const [selectedWilayah, setSelectedWilayah] = useState("");

    useEffect(() => {
        // ambil data wilayah dari localstorage trakhir yang ada
        const savedWilayah = localStorage.getItem("selectedWilayah")
        const savedWilayahName = localStorage.getItem("selectedWilayahName")

        if (savedWilayah && savedWilayahName) {
            setSelectedWilayah(savedWilayah)
            setSearch(savedWilayahName)
            setSelected(savedWilayah)
        }

        fetch("https://api.myquran.com/v2/sholat/kota/semua")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data) {
                    setOptions(data.data);
                } else {
                    throw new Error("Data tidak ditemukan");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch Error:", err);
                setError("Gagal mengambil data");
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="p-6 h-svh flex items-center justify-center">
            <Loader />
        </div>
    );

    if (error) return (
        <div className="p-6 h-screen flex items-center justify-center">
            <Error error={error} />
        </div>
    );

    // Filter opsi berdasarkan input pencarian
    const filteredOptions = options.filter((wilayah) =>
        wilayah.lokasi.toUpperCase().includes(search.toUpperCase())
    );

    return (
        <div className="relative p-4 lg:w-1/2">
            <label htmlFor="searchDropdown" className="block font-semibold mb-2 text-black">
                Pilih Wilayah:
            </label>
            {/* Input Pencarian */}
            <input
                type="text"
                id="searchDropdown"
                placeholder="Cari wilayah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className="w-full p-3 border rounded-md text-sm text-black bg-white shadow-md focus:outline-none focus:ring-2"
            />

            {/* Dropdown */}
            {isOpen && search && (
                <ul className="absolute z-10 w-4/5 bg-white border text-black rounded-md shadow-md mt-1 max-h-60 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((wilayah) => (
                            <li
                                key={wilayah.id}
                                onClick={() => {
                                    setSelected(wilayah.id); // Simpan ID lokasi ke parent component
                                    setSelectedWilayah(wilayah.id); // Simpan ID ke state
                                    setSearch(wilayah.lokasi); // Menampilkan lokasi di input
                                    localStorage.setItem("selectedWilayah", wilayah.id) // Simpan ID ke local storage
                                    localStorage.setItem("selectedWilayahName", wilayah.lokasi) //Simpan nama ke local storage
                                    setIsOpen(false); // Tutup dropdown setelah memilih
                                }}
                                className="p-3 cursor-pointer hover:bg-gray-100"
                            >
                                {wilayah.lokasi}
                            </li>
                        ))
                    ) : (
                        <li className="p-3 text-gray-500">Wilayah tidak ditemukan</li>
                    )}
                </ul>
            )}
        </div>
    );
}
