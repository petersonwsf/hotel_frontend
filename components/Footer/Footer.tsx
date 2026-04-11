import { FaGithub, FaLinkedin } from "react-icons/fa"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className='bg-gray-300 flex flex-col h-[150px] justify-center items-center [&>*]:text-gray-700 [&>*]:flex [&>*]:gap-3'>
            <p>&copy; 2026 Lúmen Hotel. Desenvolvido por Peterson William</p>
            <div className="mt-3">
                <Link target="_blank" href="https://github.com/petersonwsf"><FaGithub className="w-6 h-6"/></Link>
                <Link target="_blank" href="https://www.linkedin.com/in/peterson-william-02ba87243/"><FaLinkedin className="w-6 h-6"/></Link>
            </div>
        </footer>
    )
}