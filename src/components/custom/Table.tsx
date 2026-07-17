import React from "react";

interface TableProps {
  title: string;
  headers: string[];
  data: (string | number)[][];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const Table: React.FC<TableProps> = ({
  //title,
  headers,
  data,
  onEdit,
  onDelete,
}) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-[#BBD08A] text-[#000000]">
          {headers.map((h, i) => (
            <th key={i} className="p-3 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="p-3">
                  {cell}
                </td>
              ))}
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(i)}
                  className="text-[#576493] hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(i)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={headers.length}
              className="text-center p-4 text-gray-500"
            >
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Table;
