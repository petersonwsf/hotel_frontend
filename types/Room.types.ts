export interface RoomQueryParams {
    page?: number;
    size?: number;
    category?: RoomCategory[];
    capacity?: number;
    minPrice?: number;
    maxPrice?: number;
    checkInDate?: string;
    checkOutDate?: string;
    code?: string;
    floor?: string[];
    status?: StatusRoom[];
    sort?: string;
}

export interface RoomList {
    active: boolean;
    amenities: string[];
    bedconfig: string;
    capacity: number;
    category: RoomCategory;
    code: string;
    customPrice: number;
    floor: string;
    description: string;
    id: number;
    status: StatusRoom;
    image: string;
}

export interface Room { 
    active: boolean;
    amenities: string[];
    bedconfig: string;
    capacity: number;
    category: RoomCategory;
    code: string;
    customPrice: number;
    floor: string;
    description: string;
    id: number;
    status: StatusRoom;
    image: string[];
}

export const optionsFloor = [
    {label: 'Térreo', value: 'TERREO'},
    {label: '1° Andar', value: '1_ANDAR'},
    {label: '2° Andar', value: '2_ANDAR'},
    {label: '3° Andar', value: '3_ANDAR'}
]

export const optionsStatus = [
    {label : "Disponível", value: "AVAILABLE"},
    {label : "Fora de ordem", value: "OUT_OF_ORDER"}
]

export const optionsCategory : { value: RoomCategory, label: string }[] = [
    {value: 'DLX', label: 'Deluxe'},
    {value: 'PRM', label: 'Premium'},
    {value: 'PST', label: 'Suíte Presidencial'},
    {value: 'STD', label: 'Padrão'},
    {value: 'STE', label: 'Suíte'},
    {value: 'STJ', label: 'Suíte Júnior'},
    {value: 'SUP', label: 'Superior'},
]

export const COMODIDADES = [
  { label: "Cama de casal", value: "cama_de_casaL"},
  { label: "Cama de solteiro",value: "cama_de_solteiro" },
  { label: "Roupa de cama extra", value: "roupa_de_cama_extra" },
  { label: "Travesseiros extras", value: "travesseiros_extras" },
  { label: "Banheira", value: "banheira" },
  { label: "Chuveiro", value: "chuveiro" },
  { label: "Toalhas de banho", value: "toalhas_de_banho" },
  { label: "Roupão", value: "roupao" },
  { label: "Amenidades de banho", value: "amenidades_de_banho" },
  { label: "Secador de cabelo", value: "secador_de_cabelo" },
  { label: "TV a cabo", value: "tv_a_cabo" },
  { label: "Wi-Fi gratuito", value: "wifi_gratuito" },
  { label: "Tomadas USB", value: "tomadas_usb" },
  { label: "Cofre eletrônico", value: "cofre_eletronico" },
  { label: "Telefone fixo", value: "telefone_fixo" },
  { label: "Streaming (Netflix etc.)", value: "servico_de_streaming" },
  { label: "Ar-condicionado", value: "ar_condicionado" },
  { label: "Aquecedor", value: "aquecedor" },
  { label: "Blackout nas janelas", value: "cortina_blackout" },
  { label: "Ventilador de teto", value: "ventilador_de_teto" },
  { label: "Minibar", value: "minibar" },
  { label: "Cafeteira", value: "cafeteira" },
  { label: "Micro-ondas", value: "micro_ondas" },
  { label: "Frigobar", value: "frigobar" },
  { label: "Chaleira elétrica", value: "chaleira_eletrica" },
  { label: "Serviço de quarto 24h", value: "servico_de_quarto_24h" },
  { label: "Serviço de lavanderia", value: "servico_de_lavanderia" },
  { label: "Mesa de trabalho", value: "mesa_de_trabalho" },
  { label: "Ferro de passar roupa", value: "ferro_de_passar_roupa" } 
]

export type StatusRoom = "AVAILABLE" | "OUT_OF_ORDER" | "OCCUPIED" | "MAINTENANCE" | "CLEANING"

export type RoomCategory = 'STD' | 'SUP' | 'DLX' | 'STE' | 'STJ' | 'PRM' | 'PST'