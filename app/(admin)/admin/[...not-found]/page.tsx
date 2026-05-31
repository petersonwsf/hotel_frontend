import { notFound } from 'next/navigation';
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "404 - Página não encontrada",
  description: "A página buscada não existe",
}

export default function CatchAll() {
    notFound();
}