export default function LoadingRoomsList() {
    return (
        <section id="rooms" aria-label="Quartos disponíveis">
            <div className="flex justify-center items-start w-7xl m-auto gap-5 my-[4rem]">
                <aside aria-label="Filtros" className="bg-gray-300 p-5 w-[30%] h-[500px] rounded-[10px] sticky top-10 animate-pulse"></aside>
                <div className="w-[70%]">
                    <h2 className="font-semibold text-3xl">Quartos</h2>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className="flex my-3 p-4 gap-3 bg-gray-300 rounded-[10px] animate-pulse h-[200px]" key={index}></div>
                    ))}
                </div>
            </div>
        </section>
    )
}