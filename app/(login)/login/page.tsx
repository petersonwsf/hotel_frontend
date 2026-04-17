import LoginForm from "@/components/login/FormLogin";

export default function Login() {
    return (
        <div className="bg-white w-[500px] h-[500px] rounded-[40px] p-5 flex flex-col items-center justify-center shadow-xl">
            <h2 className="text-6xl text-center text-[#002BB3] my-[2rem]">Login</h2>
            <LoginForm />
        </div>
    )
}