'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

const KeywordDropdown = ({ keywords, onSelect }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const debouncedSearch = useCallback(
        debounce((value) => setSearch(value), 300),
        []
    );

    const filteredKeywords = useMemo(() => {
        if (!search) return Object.entries(keywords);
        const searchLower = search.toLowerCase();
        return Object.entries(keywords)
            .filter(([key]) => key.toLowerCase().includes(searchLower));
    }, [keywords, search]);

    return (
        <div className="relative mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select a Category
            </label>
            <input
                type="text"
                className="border p-3 w-full rounded-lg shadow-sm"
                placeholder="Search categories..."
                onChange={(e) => debouncedSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
                    {filteredKeywords.map(([category, items], idx) => (
                        <div key={`category-${idx}`} className="p-4 border-b">
                            <h3 className="font-medium text-gray-800">{category}</h3>
                            <ul className="list-disc list-inside">
                                {items.slice(0, 5).map((item, i) => (
                                    <li
                                        key={`item-${i}`}
                                        className="cursor-pointer text-blue-600 hover:underline"
                                        onClick={() => {
                                            onSelect(item);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                                {items.length > 5 && (
                                    <li className="text-gray-500">+{items.length - 5} more</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};