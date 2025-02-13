"use client"

import { useEffect, useState } from "react";

import Loader from "./ui/loader";
import Error from "./ui/error";

export default function DropSearchQuran({ setSelected }) {
    const [options, setOptions] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // Untuk menampilkan dropdown

    useEffect(() => {
        fetch("https://api.myquran.com/v2/quran/surat/semua")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data) {
                    setOptions(data.data)
                } else {
                    throw new error("Data tidak ditemukan")
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error("Fetch Error:", err);
                setError("Gagal mengambil data");
                setLoading(false);

            })

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

    // filter opsi pencarian
    const filteredOptions = options.filter((quran) =>
        quran.name_id.toUpperCase().includes(search.toUpperCase())
    )

    return (
        <div className="relative p-4 lg:w-1/2">
            <label htmlFor="searchDropdown" className="block font-semibold mb-2">
                Cari Surat:
            </label>

            <input
                type="text"
                id="searchDropdown"
                placeholder="Cari Surat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className="w-full p-3 border rounded-md text-sm bg-white shadow-md focus:outline-none focus:ring-2"
            >
            </input>

            {isOpen && search && (
                <ul className="absolute z-10 w-4/5 bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((surat) => (
                            <li
                                key={surat.number}
                                onClick={() => {
                                    setSelected(surat.number); // Simpan ID lokasi ke parent component
                                    setSearch(surat.name_id); // Menampilkan name_id di input
                                    setIsOpen(false); // Tutup dropdown setelah memilih
                                }}
                                className="p-3 cursor-pointer hover:bg-gray-100"
                            >
                                {surat.name_id}
                            </li>
                        ))
                    ) : (
                        <li className="p-3 text-gray-500">Surat tidak ditemukan</li>
                    )}
                </ul>
            )}
        </div>
    )

}