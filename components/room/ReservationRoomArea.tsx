import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";


export default function ReservationRoomArea() {

    const error = true;

    return (
        <div className="mt-5">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xl">Valor da diária</p>
                    <p className="text-xm my-1"><span className="line-through mr-2">R$ 999,00</span> <span className="bg-green-500 rounded-[5px] py-1 px-3 text-xs text-white font-semibold">Abaixou 12%</span></p>
                    <p className="text-xl">Por <span className="font-semibold">R$ 500,99</span></p>
                </div>
                <div>
                    <button className="bg-green-600 text-xl rounded-[5px] text-white px-[2rem] py-2">Realizar reserva</button>
                </div>
            </div>
            <div className="mt-[2rem] p-[1rem] rounded-[10px] bg-gray-200">
                <h4 className="text-lg mb-3">Verificar disponibilidade do quarto</h4>
                <div className="flex">
                    <div className="w-full">
                        <div className="flex gap-2 items-center my-1">
                            <p>Data de check-in:</p> <input type="date" name="startDate" id="startDate" className="p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] bg-white" />
                        </div>
                        <div className="flex gap-2 items-center my-1">
                            <p>Data de check-out:</p> <input type="date" name="endDate" id="endDate" className="p-3 border-1 border-gray-300 outline-none font-light rounded-[10px] bg-white" />
                        </div>
                        <button className="bg-[#002BB3] rounded-[5px] text-white px-[2rem] py-2 cursor-pointer mt-1">Verificar</button>
                    </div>
                    <div className="w-[40%] flex items-center justify-center">
                        {error ? (
                            <div className="p-[1rem] border-3 rounded-[10px] flex justify-center items-center border-red-500 bg-red-100 flex-col items-center gap-2">
                                <IoMdCloseCircle fontSize={30} style={{color: 'red'}}/>
                                <p className="text-red-500 text-xs text-center font-medium">Quarto indisponível no período informado</p>
                            </div>
                        ) : (
                            <div className="p-[1rem] border-3 rounded-[10px] flex justify-center items-center border-green-500 bg-green-100 flex-col items-center gap-2">
                                <FaCheckCircle fontSize={30} style={{color: 'green'}}/>
                                <p className="text-green-500 text-xs text-center font-medium">Quarto disponível no período informado</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}