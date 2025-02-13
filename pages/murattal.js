"use client";

import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import Error from "@/components/ui/error";
import Loader from "@/components/ui/loader";
import DropSearchQuran from "@/components/SearchQuran";

export default function Murattal() {
    const [selected, setSelected] = useState(""); // Untuk menyimpan wilayah yang dipilih
    const [suratId, setSuratId] = useState(null);
    const [nameLong, setnameLong] = useState(null);
    const [number, setNumber] = useState(null);
    const [numberOfVerses, setNumberOfVerses] = useState(null);
    const [audio, setAudio] = useState(null);
    const [error, setError] = useState(null);
    const [revelationId, setRevelationId] = useState(null);
    const [tafsir, setTafsir] = useState(null);
    const [translationId, setTranslationId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selected) return; // Jika belum memilih wilayah, tidak perlu fetch data

        const fetchSurat = async () => {
            setError(null)
            try {
                const res = await fetch(`https://api.myquran.com/v2/quran/surat/${selected}`)

                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

                const data = await res.json();
                console.log("data: ", data)

                if (!data || !data.data || !data.data.audio_url) {
                    throw new Error("URL Audio tidak ditemukan!");
                }

                setAudio(data.data.audio_url);
                setSuratId(data.data.name_id);
                setnameLong(data.data.name_long)
                setNumber(data.data.number)
                setNumberOfVerses(data.data.number_of_verses)
                setRevelationId(data.data.revelation_id)
                setTafsir(data.data.tafsir)
                setTranslationId(data.data.translation_id)
            } catch (err) {
                setError(err.message);
            }
        }

        fetchSurat()
    }, [selected]); // Fetch ulang saat `selected` berubah

    return (
        <Layout>
            <h1 className="sticky top-20 z-50 p-6 lg:px-5 text-lg font-semibold bg-white border shadow-md">Murattal</h1>
            <div className="p-6 md:h-svh">
                <div className="md:flex-row gap-y-4 justify-center">
                    <div className="border rounded-md shadow-md md:mb-0 mb-4">
                        <DropSearchQuran setSelected={setSelected} />

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

                        <div className="flex justify-center p-4">
                            <div className=" border rounded-md shadow-md md:mb-0 mb-4 p-6 w-full md:w-4/5">
                                <div className="flex justify-between md:justify-around">
                                    <h1 className="md:text-xl text-sm text-right font-bold">
                                        {suratId == null ? "Pilih surat terlebih dahulu!" : `Surat ${suratId}`}
                                    </h1>
                                    <h1 className="md:text-xl text-sm font-bold ">
                                        {nameLong}
                                    </h1>
                                </div>
                                <div className="grid grid-cols-2 gap-4 md:flex md:justify-around place-content-center align-center mt-4 border-b border-gray-200">
                                    <h1 className="text-sm font-medium text-pretty text-gray-500 sm:text-xl/8 ">
                                        {translationId}
                                    </h1>

                                    <h1 className="text-sm font-medium text-pretty text-gray-500 sm:text-xl/8 ">
                                        {revelationId}
                                    </h1>


                                    <h1 className="text-sm font-medium text-pretty text-gray-500 sm:text-xl/8 ">
                                        {number == null ? "" : `Surat ke-${number}`}
                                    </h1>


                                    <h1 className="text-sm font-medium text-pretty text-gray-500 sm:text-xl/8 mb-4">
                                        {numberOfVerses == null ? "" : `${numberOfVerses} ayat`}
                                    </h1>
                                </div>
                                <div className="flex justify-between md:justify-around mt-4">
                                    <h1 className="md:text-xl text-sm leading-6 font-light ">
                                        {tafsir}
                                    </h1>
                                </div>
                                <div className="flex justify-between md:justify-around mt-4">
                                <audio key={audio} controls className="w-full">
                                    <source
                                    src={audio}
                                    type="audio/mp3"
                                    />
                                    Browser Anda tidak mendukung elemen audio.
                                </audio>
                                </div>
                            </div>
                        </div>
                        <h1 className="px-4 lg:px-5 text-sm font-light">*Jika audio tidak muncul pastikan koneksi internet anda stabil</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}