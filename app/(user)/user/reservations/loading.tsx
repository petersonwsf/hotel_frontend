export default function LoadingReservations() {
    return (
        <div className="w-full">
            <h2 className="font-[650] text-[#002179] text-4xl">Minhas Reservas</h2>
            <p className="font-light text-gray-500 text-lg my-2">fique por dentro das suas reservas no Lúmen Hotel</p>
             <div>
                <div className="flex w-full border-b-1 border-gray-300 my-5 gap-[2rem]">
                    <div className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] text-gray-700`}>
                        Ativas 
                    </div>
                    <div className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] text-gray-700`}>
                        Concluídas 
                    </div>
                    <div className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] text-gray-700`}>
                        Canceladas
                    </div>
                </div>
                <div className="flex flex-col gap-[2rem] my-[1.5rem]">
                    {Array.from({ length : 5 }).map((_, index) => (
                        <div className="w-full" key={index}>
                            <div className={`flex gap-5 border bg-gray-200 animate-pulse border-gray-300 w-full transition-all duration-300 rounded-lg h-[200px]`}>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}