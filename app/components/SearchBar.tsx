"use client";
import { useState, ChangeEvent, useCallback } from "react";
import { Product } from "@/app/models/Product";
import CloseIcon from "@mui/icons-material/Close";

interface SearchBarProps {
  placeholder?: string;
  items: Product[];
  onSearch?: (searchTerm: string, filteredItems: Product[]) => void;
  previewItemRenderer?: (item: Product) => React.ReactNode;
  className?: string;
  showPreview?: boolean;
  setFilter: (filteredItems: Product[]) => void;
  resultOnChangue: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar...",
  items,
  onSearch,
  previewItemRenderer,
  className = "",
  showPreview = false,
  setFilter,
  resultOnChangue,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [openPreview, setOpenPreview] = useState(false);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      showPreview && setOpenPreview(true);
      const value = e.target.value;
      setSearchTerm(value);

      if (value) {
        const filtered = items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
        onSearch && onSearch(value, filtered);

        if (resultOnChangue) {
          setFilter(filtered);
        }
      } else {
        setFilteredItems([]);
        onSearch && onSearch(value, []);

        if (resultOnChangue) {
          setFilter(items);
        }
      }
    },
    [items, onSearch, showPreview, resultOnChangue, setFilter]
  );

  const handleItemClick = (item: Product) => {
    setFilter([item]);
    setOpenPreview(false);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredItems(items);
    setOpenPreview(false);
    onSearch && onSearch("", items);
    setFilter(items);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        className="border border-gray-300 p-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200 w-full text-center focus:placeholder:opacity-0"
        onChange={handleInputChange}
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <CloseIcon />
        </button>
      )}
      {showPreview && filteredItems.length > 0 && openPreview && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-40">
          {filteredItems.map((item) => (
            <div
              key={item.product_id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleItemClick(item)}
            >
              {previewItemRenderer ? previewItemRenderer(item) : item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
