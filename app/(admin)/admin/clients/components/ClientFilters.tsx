"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

type FilterType = 'name' | 'pin' | 'phoneNumber' | 'email'

const filterTypeLabels = {
    name: 'Nome do usuário',
    phoneNumber: 'Número do usuário',
    email: 'Email do usuário',
    pin: 'CPF do usuário'
}

export default function ClientFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [filterType, setFilterType] = useState<FilterType>('name')
    const [filterValue, setFilterValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const currentParam = searchParams.get(filterType) || "";
        if (filterValue === currentParam) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (filterValue) {
                params.delete('name')
                params.delete('phoneNumber')
                params.delete('login')
                params.set(filterType, filterValue);
            } else {
                params.delete(filterType);
            }
            router.push(`${pathname}?${params.toString()}`);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [filterValue, pathname, router, searchParams]);

    return (
        <div className="bg-white rounded-lg shadow-xl p-[1rem] gap-3 flex my-[1rem]">
            <div className="flex gap-3 items-center w-full">
                <div className="relative flex flex-col justify-center min-w-[200px]">
                    <label htmlFor="filterType" className="text-sm font-medium mb-1 text-gray-700">
                        Escolha o filtro
                    </label>
                    <select
                        name="filterType"
                        id="filterType"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as FilterType)}
                        className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all cursor-pointer appearance-none bg-white text-gray-800"
                    >
                        <option value="name">Nome</option>
                        <option value="email">Email</option>
                        <option value="phoneNumber">Telefone</option>
                        <option value="pin">CPF</option>
                    </select>
                    <div className="absolute right-4 top-1/2 translate-y-1/2 pointer-events-none flex items-center text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="guestName" className="text-sm font-medium mb-1 text-gray-700">
                        {filterTypeLabels[filterType]}
                    </label>
                    <div className="relative flex items-center w-full">
                        <input
                            type="text"
                            name="guestName"
                            id="guestName"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 rounded-xl py-4 px-4 pr-10 text-base outline-none transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {loading && (
                            <div className="absolute right-4 animate-spin text-gray-500">
                                <AiOutlineLoading3Quarters className="w-5 h-5"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}