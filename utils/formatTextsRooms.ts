import {
  FaBed, FaShower, FaBath, FaTv, FaWifi, FaUsb,
  FaLock, FaPhone, FaPlay, FaSnowflake, FaFire,
  FaWind, FaGlassMartiniAlt, FaCoffee, FaConciergeBell,
    FaSuitcase, FaToiletPaper
} from "react-icons/fa";
import {
  MdOutlineIron, MdMicrowave, MdHotelClass,
  MdOutlineLocalLaundryService,
  MdOutlineSensorWindow
} from "react-icons/md";
import { MdBed } from "react-icons/md";
import { GiPillow, GiBathtub, GiHairStrands } from "react-icons/gi";
import { TbFridge, TbTeapot } from "react-icons/tb";
import { IconType } from "react-icons";

import { RoomCategory } from "@/types/Room.types";

const amenityIconMap : Record<string, IconType> = {
  cama_de_casaL:          MdBed,
  cama_de_solteiro:       FaBed,
  roupa_de_cama_extra:    MdHotelClass,
  travesseiros_extras:    GiPillow,
  banheira:               FaBath,
  chuveiro:               FaShower,
  toalhas_de_banho:       FaToiletPaper,
  roupao:                 GiBathtub,
  amenidades_de_banho:    FaToiletPaper,
  secador_de_cabelo:      GiHairStrands,
  tv_a_cabo:              FaTv,
  wifi_gratuito:          FaWifi,
  tomadas_usb:            FaUsb,
  cofre_eletronico:       FaLock,
  telefone_fixo:          FaPhone,
  servico_de_streaming:   FaPlay,
  ar_condicionado:        FaSnowflake,
  aquecedor:              FaFire,
  cortina_blackout:       MdOutlineSensorWindow,
  ventilador_de_teto:     FaWind,
  minibar:                FaGlassMartiniAlt,
  cafeteira:              FaCoffee,
  micro_ondas:            MdMicrowave,
  frigobar:               TbFridge,
  chaleira_eletrica:      TbTeapot,
  servico_de_quarto_24h:  FaConciergeBell,
  servico_de_lavanderia:  MdOutlineLocalLaundryService,
  mesa_de_trabalho:       FaSuitcase,
  ferro_de_passar_roupa:  MdOutlineIron,
};

const categoryLabelMap: Record<RoomCategory, string> = {
  DLX: "Deluxe",
  PRM: "Premium",
  PST: "Suíte Presidencial",
  STD: "Padrão",
  STE: "Suíte",
  STJ: "Suíte Júnior",
  SUP: "Superior",
};

export function getAmenityIcon(amenity: string): IconType | null {
  return amenityIconMap[amenity] ?? null;
}

export function formatEnums(value: string) {
    return value.split("_").map((word) => {
        const cleanWord = word.toLowerCase();
        return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1)
    }).join(' ');
}

export function formatFloor(value: string) : string | undefined {
    if (value === "2_ANDAR") return "2° Andar"
    if (value === "1_ANDAR") return "3° Andar"
    if (value === "3_ANDAR") return "1° Andar"
    if (value === "TERREO") return "Térreo"
}

export function getRoomCategoryLabel(category: RoomCategory): string {
  return categoryLabelMap[category];
}