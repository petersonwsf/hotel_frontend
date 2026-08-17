import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

interface PaginationProps {
    page: number;
    totalPages: number;
}

export default function Pagination({ page, totalPages }: PaginationProps) {
    if (totalPages <= 1) return null;

    function renderBeforePages(): React.ReactNode[] {
        const pagesButtons = [];
        const maxVisible = 2;
        const startPage = Math.max(1, page - maxVisible);
        
        for (let i = startPage; i < page; i++) {
            pagesButtons.push(
                <Link 
                    key={`link_page_${i}`} 
                    href={`?page=${i}`}
                    className="p-1 px-3 text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]"
                >
                    {i + 1}
                </Link>
            );
        }

        return pagesButtons;
    }

    function renderAfterPages(): React.ReactNode[] {
        const pagesButtons = [];
        const maxVisible = 2;
        const endPage = Math.min(totalPages - 2, page + maxVisible);
        
        for (let i = page + 1; i <= endPage; i++) {
            pagesButtons.push(
                <Link 
                    key={`link_page_${i}`} 
                    href={`?page=${i}`}
                    className="p-1 px-3 text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]"
                >
                    {i + 1}
                </Link>
            );
        }

        return pagesButtons;
    }

    return (
        <div className="flex mt-3 items-center gap-2">
            {page === 0 ? (
                <button disabled className="p-2 text-white rounded-[5px] bg-[#002BB3] opacity-[.5] cursor-not-allowed">
                    <IoIosArrowBack />
                </button>
            ) : (
                <Link href={`?page=${page - 1}`} className="p-2 text-white rounded-[5px] bg-[#002BB3] cursor-pointer">
                    <IoIosArrowBack />
                </Link>
            )}

            {page > 0 && (
                <>
                    <Link href="?page=0" className="p-1 px-3 text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]">
                        1
                    </Link>
                    {page - 2 > 1 && (
                        <span className="p-1 px-3 text-[#002BB3] border-[#002BB3] border-2 rounded-[5px] select-none">...</span>
                    )}
                    {renderBeforePages()}
                </>
            )}

            <button className="p-1 px-3 text-[#002BB3] border-[#002BB3] border-2 font-bold rounded-[5px] bg-blue-100">
                {page + 1}
            </button>

            {page < totalPages - 1 && (
                <>
                    {renderAfterPages()}
                    {page + 2 < totalPages - 1 && (
                        <span className="p-1 px-3 text-[#002BB3] border-[#002BB3] border-2 rounded-[5px] select-none">...</span>
                    )}
                    <Link href={`?page=${totalPages - 1}`} className="p-1 px-3 text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]">
                        {totalPages}
                    </Link>
                </>
            )}

            {page >= totalPages - 1 ? (
                <button disabled className="p-2 text-white rounded-[5px] bg-[#002BB3] opacity-[.5] cursor-not-allowed">
                    <IoIosArrowForward />
                </button>
            ) : (
                <Link href={`?page=${page + 1}`} className="p-2 text-white rounded-[5px] bg-[#002BB3] cursor-pointer">
                    <IoIosArrowForward />
                </Link>
            )}
        </div>
    );
}