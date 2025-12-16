import React from 'react';

interface DataTableProps {
    title?: string;
    headers: string[];
    rows: string[][];
    highlightFirstColumn?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
    title,
    headers,
    rows,
    highlightFirstColumn = false
}) => {
    return (
        <div className="space-y-3">
            {title && (
                <p className="text-gray-400 text-sm">{title}</p>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-700/50">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-800/50">
                            {headers.map((header, idx) => (
                                <th
                                    key={idx}
                                    className={`
                    px-4 py-3 text-left font-medium
                    ${idx === 0 ? 'text-cyan-400' : 'text-cyan-400'}
                  `}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/30">
                        {rows.map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                className="hover:bg-gray-800/30 transition-colors"
                            >
                                {row.map((cell, cellIdx) => (
                                    <td
                                        key={cellIdx}
                                        className={`
                      px-4 py-3
                      ${cellIdx === 0 && highlightFirstColumn
                                                ? 'text-gray-200 font-medium'
                                                : 'text-gray-400'
                                            }
                    `}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
