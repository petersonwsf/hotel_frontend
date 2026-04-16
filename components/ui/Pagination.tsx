import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
    page: number;
    totalPages: number;
}

export default function Pagination({ page, totalPages } : PaginationProps) {

    function renderBeforePages() : React.ReactNode[] {
        const pagesButtons = [];
        const maxVisible = 2;
        const startPage = Math.max(2, page - maxVisible)
        
        for (let i = startPage; i < page; i++) {
            pagesButtons.push(<button key={`button_page_${i}`} className="p-1 px-3  text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]">{i}</button>)
        }

        return pagesButtons;
    }

    function renderAfterPages() : React.ReactNode[] {
        const pagesButtons = []
        const maxVisible = 2;
        const endPage = Math.min(totalPages, page + maxVisible)
        
        for (let i = page + 1; i <= endPage; i++) {
            pagesButtons.push(<button key={`button_page_${i}`} className="p-1 px-3  text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]">{i}</button>)
        }

        return pagesButtons;
    }

    return (
        <div className="flex w-full justify-center mt-3 items-center gap-2">
            <button className="p-2 text-white bg-[#002BB3] cursor-pointer rounded-[5px]"><IoIosArrowBack /></button>
            {page > 1 && (
                <>
                    <button className="p-1 px-3  text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]">1</button>
                    {page - 2 > 2 && <button className="p-1 px-3  text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]">...</button>}
                    {renderBeforePages()}
                </>
            )}
            <button className="p-1 px-3  text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px] bg-blue-100">{ page }</button>
            {page < totalPages && (
                <>
                    {renderAfterPages()}
                    {page + 2 < totalPages && <button className="p-1 px-3  text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]">...</button>}
                    <button className="p-1 px-3  text-[#002BB3] border-[#002BB3] border-2 cursor-pointer rounded-[5px]">{totalPages}</button>
                </>
            )}
            <button className="p-2 text-white bg-[#002BB3] cursor-pointer rounded-[5px]"><IoIosArrowForward /></button>
        </div>
    )
}