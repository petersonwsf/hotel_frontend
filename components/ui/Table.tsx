"use client"

interface TableProps {
    columns: string[];
    data: any[];
}

export default function Table({ columns, data }: TableProps) {

    return (
        <table className="w-full">
            <thead>
                <tr className="border-b-1 border-gray-200">
                    {columns.map((column) => (
                        <th key={column} className="py-3">
                            <div className="px-4 w-full text-start border-r-1 border-gray-200 font-semibold">
                                {column}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={`row_${index}`} className="border-b-1 border-gray-200">
                        {Object.keys(row).map((key) => (
                            <td key={`${key}_${index}`} className="p-3">
                                {row[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}