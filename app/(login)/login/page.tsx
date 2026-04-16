import Link from "next/link";

export default function Login() {
    return (
        <div className="bg-white w-[500px] h-[500px] rounded-[40px] p-5 flex flex-col items-center justify-center shadow-xl">
            <h2 className="text-6xl text-center text-[#002BB3] my-[2rem]">Login</h2>
            <form className="w-[80%]">
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="p-3 border-1 border-gray-300 outline-none font-light rounded-[10px]" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" className="p-3 border-1 border-gray-300 outline-none font-light rounded-[10px]" />
                </div>
                <p className="text-[#002BB3] my-2">Esqueceu a senha?</p>
                <Link href="/register" className="text-[#002BB3] my-2">Não possui conta? Registre-se</Link>
                <div className="w-full text-center my-5">
                    <button type="button" className="bg-[#002BB3] py-2 px-4 rounded-[5px] text-white cursor-pointer">Login</button>
                </div>
            </form>
        </div>
    )
}