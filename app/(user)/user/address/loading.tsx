export default function LoadingAddressPage() {
    return (
        <div className="w-full">
            <h2 className="font-[650] text-[#002179] text-4xl">Meu endereço</h2>
            <p className="font-light text-gray-500 text-lg my-2">Atualize suas informações de endereço</p>
            <div className="py-[1rem] w-full">
                <div className="rounded-xl overflow-hidden border-1 border-gray-300">
                    <div className="w-full bg-[#002179] py-[1rem] px-[3rem]"></div>
                    <div className="py-[1rem] px-[1.5rem]">
                        <div>
                            <div className="flex gap-3">
                                <div className="w-[30%]">
                                    <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg my-2"></div>
                                </div>
                                <div className="w-[70%]">
                                    <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg my-2"></div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <div className="w-[40%]">
                                    <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg my-2"></div>
                                </div>
                                <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg my-2"></div>
                                <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg my-2"></div>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <div className="w-[70%]">
                                    <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg my-2"></div>
                                </div>
                                <div className="w-[30%]">
                                    <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg my-2"></div>
                                </div>
                            </div>
                            <div className="mt-[1.5rem] flex justify-end">
                                <button className="text-[#002179] mt-[1rem] border text-white py-[.5rem] bg-[#002179] px-[2rem] cursor-pointer rounded-[7px] font-normal pointer-events-none">Atualizar informações</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}