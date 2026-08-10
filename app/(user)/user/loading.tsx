export default function LoadingUserPage() {
    return (
        <div>
            <h2 className="font-[650] text-[#002179] text-4xl">Minha conta</h2>
            <p className="font-light text-gray-500 text-lg my-2">Tudo pronto por aqui! O que vamos explorar hoje?</p>
            <div className="flex gap-[1rem] items-center">
                <div className="rounded-xl p-[1rem] bg-gray-200 animate-pulse flex flex-col items-start min-w-[300px] h-[150px]"></div>
                <div className="rounded-xl p-[1rem] bg-gray-200 animate-pulse flex flex-col items-start min-w-[300px] h-[150px]"></div>
            </div>
            <div className="flex w-full my-[1rem]">
                <div className="flex rounded-xl overflow-hidden bg-gray-200 gap-5 border-1 border-gray-200 w-full max-w-[800px] h-[250px] animate-pulse"></div>
            </div>
        </div>
    )
}