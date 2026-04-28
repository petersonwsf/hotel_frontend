import { FaStar } from "react-icons/fa";

export default function LoadingRoomPage() {
    return (
        <div id="room-details" className="w-7xl m-auto py-5 my-3">
            <section className="flex w-full gap-3 items-start">
                <div className="w-full flex gap-5">
                    <div className="flex flex-col justify-center gap-[1rem]">
                        {Array.from({ length: 3 }).map((_,index) => (
                            <div className="p-1 border-2 border-[#fff] rounded-[5px] duration-[0.3s] cursor-pointer hover:border-[#002BB3]" key={index}>
                                <div className="w-[100px] h-[100px] bg-gray-300 rounded-[10px] animate-pulse"></div>
                            </div>
                        ))}                        
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="w-[500px] h-[500px] animate-pulse bg-gray-300 rounded-[10px]"></div>
                    </div>
                </div>
                <div className="w-full px-3">
                    <div className="font-light text-xl [&>p]:my-2">
                        <h2 className="text-3xl font-semibold my-3 p-3 bg-gray-300 animate-pulse rounded-[10px]"></h2>
                        <p className="py-3 bg-gray-300 animate-pulse rounded-[10px]"></p>
                        <p className="py-3 bg-gray-300 animate-pulse rounded-[10px]"></p>
                        <p className="py-3 bg-gray-300 animate-pulse rounded-[10px]"></p>
                        <p className="py-3 bg-gray-300 animate-pulse rounded-[10px]"></p>
                        <p className="py-3 bg-gray-300 animate-pulse rounded-[10px]"></p>
                    </div>
                    <div className="mt-5">
                        <div className="flex justify-between items-center">
                            <div className="bg-gray-300 rounded-[10px] animate-pulse w-[300px] h-[200px]"></div>
                            <div>
                                <button className="bg-green-600 text-xl rounded-[5px] text-white py-[2rem] px-[4rem] animate-pulse"></button>
                            </div>
                        </div>
                        <div className="mt-[2rem] p-[1rem] rounded-[10px] bg-gray-300 w-[600px] h-[250px] animate-pulse"></div>
                    </div>
                </div>
            </section>
            <section className="mt-[2rem]">
                <h3 className="text-3xl">Avaliações do quarto</h3>
                <div className="flex gap-2 mt-2 items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar key={index} className="w-10 h-10 text-yellow-200 animate-pulse" />
                    ))}
                </div>
                <div className="w-[50%]">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="w-full h-[200px] my-2 bg-gray-300 animate-pulse"></div>
                    ))}
                </div>
            </section>
        </div>
    )
}