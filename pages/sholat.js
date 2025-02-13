"use client";

import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import Loader from "@/components/ui/loader";
import Error from "@/components/ui/error";
import SearchableDropdown from "@/components/Dropdown";
import Hadist from "@/components/HadistAcak";


export default function JadwalPage() {
    const [selected, setSelected] = useState(""); // Untuk menyimpan wilayah yang dipilih
    const [jadwal, setJadwal] = useState(null);
    const [lokasi, setLokasi] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
   
    // const nowSpesifik = new Date()
    // let hours = nowSpesifik.getHours()
    // let minutes = nowSpesifik.getMinutes() 
    // let minHours = [hours, minutes];

    // alert(minHours)
    useEffect(() => {
        if (!selected) return; // Jika belum memilih wilayah, tidak perlu fetch data

        const fetchJadwal = async () => {
            setError(null);
            try {
                const now = new Date().toISOString().slice(0, 10);
                const res = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${selected}/${now}`);

                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

                const data = await res.json();

                if (!data || !data.data || !data.data.jadwal) {
                    throw new Error("Data tidak ditemukan!");
                }

                setJadwal(data.data.jadwal);
                setLokasi(data.data.lokasi);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchJadwal();
    }, [selected]); // Fetch ulang saat `selected` berubah

    return (
        <Layout>
            <h1 className="sticky top-20 z-50 p-6 lg:px-5 text-lg font-semibold bg-white border shadow-md">Jadwal Sholat</h1>
            <div className="p-6 md:h-screen">
                <div className="md:flex md:flex-row gap-x-8 gap-y-4">
                    <div className="basis-2/3 border rounded-md shadow-md md:mb-0 mb-4">
                        <SearchableDropdown setSelected={setSelected} />
                        {error && (
                            <div className="p-6 flex items-center justify-center">
                                <Error error={error} />
                            </div>
                        )}

                        {loading && (
                            <div className="mt-4 flex items-center justify-center">
                                <Loader />
                            </div>
                        )}

                        <Hadist/>

                    </div>

                    {jadwal && (
                        <div className="basis-1/3 p-4 border rounded-md shadow-md bg-[url(/kakbah2.jpg)] bg-cover bg-center">
                            <h1 className="text-xl font-bold text-center mb-4">
                                Jadwal Sholat - {lokasi}
                            </h1>
                            <p className="text-center text-gray-900 mb-4">{jadwal.tanggal}</p>
                            <table className="w-full">
                                <tbody>
                                    {Object.entries(jadwal).map(([sholat, waktu]) => (
                                        sholat !== "tanggal" && sholat !== "date" && (
                                            <tr key={sholat} className="border-b">
                                                <td className="p-2 font-bold text-white capitalize">{sholat}</td>
                                                <td className="p-2 font-bold text-white text-right">{waktu}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
