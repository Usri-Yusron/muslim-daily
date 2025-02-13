import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Loader from "@/components/ui/loader";
import Error from "@/components/ui/error";

export default function Harian() {
    const [prays, setPrays] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://api.myquran.com/v2/doa/sumber/harian")
            .then((res) => res.json())
            .then((data) => setPrays(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return (
        <Layout>
            <div className="p-6 h-svh flex items-center justify-center">
                <Error error={error}/>
            </div>            
        </Layout>
    );
    if (!prays) return (
        <Layout>
            <div className="p-6 h-svh flex items-center justify-center">
                <Loader />
            </div>            
        </Layout>        
    );

    return (
        <Layout>
            <h1 className="sticky top-20 z-50 p-6 lg:px-5 text-lg font-semibold text-gray-900 bg-white">Doa Harian</h1>
            <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    {prays.data.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md shadow-md">
                            <h2 className="text-lg font-semibold text-black">{item.judul}</h2>
                            <p className="text-right text-2xl font-arabic mt-2 text-black">{item.arab}</p>
                            <p className="mt-2 text-black">{item.indo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
