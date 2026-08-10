export default function LoadingPersonalData() {
    return (
        <div className="w-full">
            <h2 className="font-[650] text-[#002179] text-4xl">Dados Pessoais</h2>
            <p className="font-light text-gray-500 text-lg my-2">Atualize suas informações e documentação</p>
            <div className="w-full my-3">
                <div className="w-full h-[200px] border-1 relative border-gray-300 rounded-lg overflow-hidden">
                    <div className="bg-[#002179] h-[100px]"></div>
                    <div className="h-[100px]"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 flex gap-3 h-full w-full justify-between">
                        <div className="flex h-full items-center gap-4 px-[1rem]">
                            <div className="w-[100px] h-[100px] flex justify-center items-center bg-gray-300 animate-pulse rounded-lg border-4 border-white shadow-xl "></div>
                            <div className="pt-[2.5rem]">
                                <h2 className="text-3xl font-light w-[200px] bg-gray-300 rounded-xl p-3 animate-pulse"></h2>
                            </div>
                        </div>
                        <div className="flex h-full items-end">
                            <button className="text-[#002179] m-[1rem] border border-[#002179] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal pointer-events-none">Atualizar Avatar</button>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-[2rem] rounded-lg border-1 border-gray-300 p-[2rem]'>
                    <div>
                        <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg"></div>
                        <div className='flex my-3 gap-3'>
                            <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg"></div>
                            <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg"></div>
                        </div>
                        <div className='flex my-3 gap-3'>
                            <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg"></div>
                            <div className="w-full bg-gray-300 p-[1.5rem] animate-pulse rounded-lg"></div>
                        </div>
                        <div className="mt-[1.5rem] flex justify-end">
                            <button className="text-[#002179] mt-[1rem] border text-white py-[.5rem] bg-[#002179] px-[2rem] cursor-pointer rounded-[7px] font-normal pointer-events-none">Atualizar informações</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}