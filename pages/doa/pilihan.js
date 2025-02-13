import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Loader from "@/components/ui/loader";
import Error from "@/components/ui/error";
import DropSearchQuran from "@/components/SearchQuran";

export default function Pilihan() {
    const [option, setOption] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // var hadist acak
    const [random, setRandom] = useState(null)

    useEffect(() => {
        fetch("https://api.myquran.com/v2/doa/sumber/pilihan")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setOption(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

     // Fetch doa random
     const fetchDoaRandom = () => {
        setLoading(true);
        setError(null);

        fetch("https://api.myquran.com/v2/doa/acak")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.data) {
                    setRandom(data.data);
                } else {
                    throw new Error("Data tidak ditemukan");
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    if (error) return (
        <Layout>
            <div className="p-6 h-svh flex items-center justify-center">
                <Error error={error} />
            </div>
        </Layout>
    );
    if (!option) return (
        <Layout>
            <div className="p-6 h-svh flex items-center justify-center">
                <Loader />
            </div>
        </Layout>
    );

    return (
        <Layout>
            <h1 className="sticky top-20 z-50 p-6 lg:px-5 text-lg font-semibold text-gray-900 bg-white">Doa Pilihan</h1>
            <div className="px-6 pb-6 ">
                <div className="p-6 border rounded-md shadow-md h-fit mb-4">
                    {loading ? (
                        <div className="mt-4 flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <div className="p-4 ">
                            <h2 className="text-base font-semibold text-black">{random?.judul}</h2>
                            <p className="text-right text-2xl font-arabic mt-2 text-black">{random?.arab}</p>
                            <p className="mt-2 text-black">{random?.indo}</p>
                        </div>
                    )}

                    {/* 🔹 Tombol untuk mengambil hadits baru */}
                    <button
                        onClick={fetchDoaRandom}
                        className="mt-4 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Ambil Hadits Baru
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    {option.data.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md shadow-md">
                            <h2 className="text-base font-semibold text-black">{item.judul}</h2>
                            <p className="text-right text-2xl font-arabic mt-2 text-black">{item.arab}</p>
                            <p className="mt-2 text-black">{item.indo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}