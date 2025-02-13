import Layout from "@/components/Layout";

export async function getStaticProps() {
    const res = await fetch("https://api.myquran.com/v2/husna/semua")
    const data = await res.json()

    return {
        props: { data }
    }
}

export default function asmaulHusna({ data }) {
    return (
        <Layout>
            <h1 className="sticky top-20 z-50 p-6 lg:px-5 text-lg font-semibold text-gray-900 bg-white">Asmaul Husna</h1>
            <div className="px-6 pb-6">
                <div>
                <div className="bg-red-300 md:float-right"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    {data.data.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md shadow-md">
                            <p className="text-right text-2xl font-arabic mt-2 text-black">{item.arab}</p>
                            <p className="mt-2 text-black">{item.indo}</p>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </Layout>
    )
}