interface CardInfoProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

export default function CardInfo({ icon, label, value } : CardInfoProps) {
    return (
        <div className="rounded-xl p-[1rem] bg-gray-50 flex flex-col items-start min-w-[300px]">
            <div className="bg-blue-200 rounded-[5px] flex justify-center items-center text-[#002179] p-[.5rem] my-3">
                {icon}
            </div>
            <h4 className="tracking-[.1rem] font-light text-gray-500">{label}</h4>
            <h4 className="tracking-[.05rem] font-semibold text-[#002179] text-2xl">{value}</h4>
        </div>
    )
}