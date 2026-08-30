"use client"
import { optionsCategory, optionsFloor } from "@/types/Room.types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

interface FilterState {
    category: string[]
    floor: string[]
    minPrice?: number
    maxPrice?: number
}

export default function Filter() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [filters, setFilters] = useState<FilterState>({
        category: searchParams.get("categoria")?.split(",") || [],
        floor: searchParams.get("andar")?.split(",") || [],
        minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
        maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    })

    const handleArrayFilters = (name: 'category' | 'floor', value: string, checked: boolean) => {
        setFilters(prev => {
            const currentList = prev[name]
            const updatedList = checked 
                ? [...currentList, value] 
                : currentList.filter(item => item !== value)
            
            return { ...prev, [name]: updatedList }
        })
    }

    const handlePriceFilter = (id: string, min: number | undefined, max: number | undefined, checked: boolean) => {
        if (checked) {
            setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))
        } else {
            setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }))
        }
    }

    const applyFilters = () => {
        const params = new URLSearchParams()
        filters.category.forEach(val => {
            params.append("category", val)
        })
        filters.floor.forEach(val => {
            params.append("floor", val)
        })
        if (filters.minPrice !== undefined) {
            params.set("minPrice", filters.minPrice.toString())
        }
        if (filters.maxPrice !== undefined) {
            params.set("maxPrice", filters.maxPrice.toString())
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <aside aria-label="Filtros" className="bg-gray-100 p-5 w-[30%] rounded-[10px] sticky top-10 flex flex-col gap-4">
            <h3 className="font-light text-2xl mb-3">Filtros</h3>
            <div className="py-3">
                <h4 className="text-xl font-light mb-3">Categoria</h4>
                <div className="flex flex-wrap gap-3">
                    {optionsCategory.map((item) => (
                        <div key={item.value} className="flex gap-1 items-center">
                            <input 
                                type="checkbox" 
                                id={item.value} 
                                checked={filters.category.includes(item.value)}
                                onChange={(e) => handleArrayFilters("category", item.value, e.target.checked)}
                            />
                            <label htmlFor={item.value} className="font-light">{item.label}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-3">
                <h4 className="text-xl font-light mb-3">Andar</h4>
                <div className="flex flex-wrap gap-3">
                    {optionsFloor.map((item) => (
                        <div key={item.value} className="flex gap-1 items-center">
                            <input 
                                type="checkbox" 
                                id={item.value} 
                                checked={filters.floor.includes(item.value)}
                                onChange={(e) => handleArrayFilters("floor", item.value, e.target.checked)}
                            />
                            <label htmlFor={item.value} className="font-light">{item.label}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-3">
                <h4 className="text-xl font-light mb-3">Custo</h4>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-1 items-center">
                        <input 
                            type="checkbox" 
                            id="preco_menor_700" 
                            checked={filters.minPrice === 0 && filters.maxPrice === 700}
                            onChange={(e) => handlePriceFilter("preco_menor_700", 0, 700, e.target.checked)}
                        />
                        <label htmlFor="preco_menor_700" className="font-light">R$ 0,00 - R$ 700,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input 
                            type="checkbox" 
                            id="preco_entre_700_1000" 
                            checked={filters.minPrice === 701 && filters.maxPrice === 1000}
                            onChange={(e) => handlePriceFilter("preco_entre_700_1000", 701, 1000, e.target.checked)}
                        />
                        <label htmlFor="preco_entre_700_1000" className="font-light">R$ 700,00 - R$ 1.000,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input 
                            type="checkbox" 
                            id="preco_entre_1000_1500" 
                            checked={filters.minPrice === 1001 && filters.maxPrice === 1500}
                            onChange={(e) => handlePriceFilter("preco_entre_1000_1500", 1001, 1500, e.target.checked)}
                        />
                        <label htmlFor="preco_entre_1000_1500" className="font-light">R$ 1000,00 - R$ 1.500,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input 
                            type="checkbox" 
                            id="preco_maior_1500" 
                            checked={filters.minPrice === 1501 && filters.maxPrice === undefined}
                            onChange={(e) => handlePriceFilter("preco_maior_1500", 1501, undefined, e.target.checked)}
                        />
                        <label htmlFor="preco_maior_1500" className="font-light">R$ 1.500,00 - ...</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button 
                    onClick={applyFilters}
                    className="mt-3 bg-[#002179] py-[.5rem] px-[1rem] text-white font-light rounded-lg cursor-pointer"
                >
                    Aplicar Filtros
                </button>
            </div>
        </aside>
    )
}