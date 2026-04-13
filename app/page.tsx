import FeaturedRooms from "@/components/home/FeaturedRooms";
import Gallery from "@/components/home/Gallery";
import Location from "@/components/home/Location";
import Offer from "@/components/home/Offer";
import Reviews from "@/components/home/Reviews";
import ImageSlider from "@/components/ui/ImageSlider/ImageSlider";

export default function Home() {
  return (
    <>
        <section id="hero-section" aria-label="Destaques do hotel">
          <ImageSlider />
        </section>
        <div className="m-auto w-7xl py-5">
          <FeaturedRooms />
          <Offer />
          <Reviews />
          <Gallery />
          <Location />
        </div>
    </>
  );
}

/*
5. Galeria de Fotos (O Visual)
Um grid de imagens (estilo Instagram ou Masonry).

Objetivo: Mostrar os detalhes que não couberam nas outras sessões: o jardim, a recepção, detalhes da decoração.

6. Localização & Mapa (A Praticidade)
O hóspede quer saber o que tem por perto.

O que colocar: Um mapa estilizado (ou apenas o Google Maps) e uma lista de pontos de interesse (ex: "A 500m da Praia", "Próximo ao Centro Histórico").

7. Chamada para Ação (CTA Final)
Antes do rodapé, dê um último empurrão.

O que colocar: Um banner simples com fundo escuro ou dourado: "Pronto para uma estadia inesquecível? Garanta o melhor preço reservando direto pelo site." + Botão RESERVAR AGORA.
*/