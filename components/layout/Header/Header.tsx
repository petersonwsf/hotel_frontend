import Image from 'next/image';
import { FaUser } from 'react-icons/fa';

export default function Header() {
    return (
        <header className="bg-[#002BB3] p-5 text-white">
            <nav className='flex items-center justify-between'>
                <div>
                    <Image alt='logo Lúmen Hotel' src="/images/logo.png" width={75} height={75} priority/>
                </div>
                <div>
                    <ul className='flex [&>*]:flex [&>*]:items-center [&>*]:gap-2 items-center gap-5'>
                        <li>Início</li>
                        <li>Quartos</li>
                        <li>Localização</li>
                        <li><FaUser className='w-5 h-5' /> Entrar</li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}