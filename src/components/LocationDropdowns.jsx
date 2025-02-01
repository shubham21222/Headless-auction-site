'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

const CountryDropdown = ({ countries, onSelect }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const debouncedSearch = useCallback(
        debounce((value) => setSearch(value), 300),
        []
    );

    const filteredCountries = useMemo(() => {
        if (!search) return Object.keys(countries);
        return Object.keys(countries).filter(country => 
            country.toLowerCase().includes(search.toLowerCase())
        );
    }, [countries, search]);

    return (
        <div className="relative mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select Country
            </label>
            <input
                type="text"
                className="border p-3 w-full rounded-lg shadow-sm"
                placeholder="Search countries..."
                onChange={(e) => debouncedSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <div className="absolute z-30 w-full bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
                    {filteredCountries.map((country, idx) => (
                        <div
                            key={`country-${idx}`}
                            className="p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onSelect(country);
                                setIsOpen(false);
                            }}
                        >
                            {country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const StateDropdown = ({ states, onSelect }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const debouncedSearch = useCallback(
        debounce((value) => setSearch(value), 300),
        []
    );

    const filteredStates = useMemo(() => {
        if (!search) return Object.keys(states || {});
        return Object.keys(states || {}).filter(state => 
            state.toLowerCase().includes(search.toLowerCase())
        );
    }, [states, search]);

    return (
        <div className="relative mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select State
            </label>
            <input
                type="text"
                className="border p-3 w-full rounded-lg shadow-sm"
                placeholder="Search states..."
                onChange={(e) => debouncedSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <div className="absolute z-20 w-full bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
                    {filteredStates.map((state, idx) => (
                        <div
                            key={`state-${idx}`}
                            className="p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onSelect(state);
                                setIsOpen(false);
                            }}
                        >
                            {state}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const CityDropdown = ({ cities, onSelect }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const debouncedSearch = useCallback(
        debounce((value) => setSearch(value), 300),
        []
    );

    const filteredCities = useMemo(() => {
        if (!search) return cities || [];
        return (cities || []).filter(city => 
            city.toLowerCase().includes(search.toLowerCase())
        );
    }, [cities, search]);

    return (
        <div className="relative mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select City
            </label>
            <input
                type="text"
                className="border p-3 w-full rounded-lg shadow-sm"
                placeholder="Search cities..."
                onChange={(e) => debouncedSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
                    {filteredCities.map((city, idx) => (
                        <div
                            key={`city-${idx}`}
                            className="p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onSelect(city);
                                setIsOpen(false);
                            }}
                        >
                            {city}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};