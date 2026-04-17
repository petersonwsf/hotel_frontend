import FormRegister from "@/components/login/FormRegister";

export default function Register() {
    return (
        <div className="w-[600px] bg-white rounded-[40px] p-5 flex flex-col items-center justify-center shadow-xl my-[2rem]">
            <h2 className="text-6xl text-center text-[#002BB3] my-[2rem]">Registrar</h2>
            <FormRegister />            
        </div>
    )
}