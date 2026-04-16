export default function Filter() {
    return (
        <aside aria-label="Filtros" className="bg-gray-100 p-5 w-[30%] rounded-[10px] sticky top-10">
            <h3 className="font-light text-2xl mb-3">Filtros</h3>
            <div className="py-3 ">
                <h4 className="text-xl font-light mb-3">Categoria</h4>
                <div className="flex flex-wrap gap-3">
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="categoria" id="categoria_deluxe" value="STD" />
                        <label htmlFor="categoria_deluxe" className="font-light">Padrão</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="categoria" id="categoria_superior" value="SUP" />
                        <label htmlFor="categoria_superior" className="font-light">Superior</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="categoria" id="categoria_deluxe" value="DLX" />
                        <label htmlFor="categoria_deluxe" className="font-light">Deluxe</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="categoria" id="categoria_suite" value="STE" />
                        <label htmlFor="categoria_suite" className="font-light">Suíte</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="categoria" id="categoria_junior" value="STJ" />
                        <label htmlFor="categoria_junior" className="font-light">Júnior Suíte</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="categoria" id="categoria_premium" value="PRM" />
                        <label htmlFor="categoria_premium" className="font-light">Premium</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="categoria" id="categoria_presidencial" value="PST" />
                        <label htmlFor="categoria_presidencial" className="font-light">Presidencial suíte</label>
                    </div>
                </div>
            </div>
            <div className="py-3">
                <h4 className="text-xl font-light mb-3">Andar</h4>
                <div className="flex flex-wrap gap-3">
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="andar" id="andar_0" value="0" />
                        <label htmlFor="andar_0" className="font-light">Térreo</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="andar" id="andar_1" value="1" />
                        <label htmlFor="andar_1" className="font-light">1° Andar</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="andar" id="andar_2" value="2" />
                        <label htmlFor="andar_2" className="font-light">2° Andar</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="andar" id="andar_3" value="3" />
                        <label htmlFor="andar_3" className="font-light">3° Andar</label>
                    </div>
                </div>
            </div>
            <div className="py-3">
                <h4 className="text-xl font-light mb-3">Custo</h4>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="preco" id="preco_menor_700" value="X <= 700" />
                        <label htmlFor="preco_menor_700" className="font-light">R$ 0,00 - R$ 700,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="preco" id="preco_entre_700_1000" value="700 < X <= 1000" />
                        <label htmlFor="preco_entre_700_1000" className="font-light">R$ 700,00 - R$ 1.000,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="preco" id="preco_entre_1000_1500" value="1000 < X <= 1500" />
                        <label htmlFor="preco_entre_1000_1500" className="font-light">R$ 1000,00 - R$ 1.500,00</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" name="preco" id="preco_maior_1500" value="X >= 1500" />
                        <label htmlFor="preco_maior_1500" className="font-light">R$ 1.500,00 - ...</label>
                    </div>
                </div>
            </div>
        </aside>
    )
}