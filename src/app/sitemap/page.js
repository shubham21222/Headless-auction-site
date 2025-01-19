'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import { debounce } from "lodash";

const Page = () => {
  const [keywords, setKeywords] = useState({});
  const [countries, setCountries] = useState({});
  const [categorySearch, setCategorySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    category: false,
    country: false,
    state: false,
    city: false,
  });
  const dropdownRefs = useRef({});
  const router = useRouter();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedKeywords = localStorage.getItem("keywords");
        const cachedCountries = localStorage.getItem("countries");

        if (cachedKeywords && cachedCountries) {
          setKeywords(JSON.parse(cachedKeywords));
          setCountries(JSON.parse(cachedCountries));
        } else {
          const [keywordsResponse, countriesResponse] = await Promise.all([
            fetch("/keywords.json"),
            fetch("/countries.json"),
          ]);

          const keywordsData = await keywordsResponse.json();
          const countriesData = await countriesResponse.json();

          localStorage.setItem("keywords", JSON.stringify(keywordsData));
          localStorage.setItem("countries", JSON.stringify(countriesData));

          setKeywords(keywordsData);
          setCountries(countriesData);
        }
      } catch (error) {
        console.error("Error fetching JSON files:", error);
      }
    };
    fetchData();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setIsDropdownOpen((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Combine categories and keywords
  const allCategoryItems = useMemo(() => {
    const items = [];
    Object.entries(keywords).forEach(([category, keywordList]) => {
      items.push(category); // Add the category
      items.push(...keywordList); // Add all keywords under the category
    });
    return items;
  }, [keywords]);

  const filteredCategories = useMemo(() => {
    if (!categorySearch) return allCategoryItems;
    return allCategoryItems.filter((item) =>
      item.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [allCategoryItems, categorySearch]);

  // Filter logic for dropdowns
  const filteredCountries = useMemo(() => {
    const allCountries = Object.keys(countries);
    if (!countrySearch) return allCountries;
    return allCountries.filter((key) =>
      key.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countries, countrySearch]);

  const filteredStates = useMemo(() => {
    if (!filteredCountries.length) return [];
    const allStates = filteredCountries
      .map((country) => Object.keys(countries[country] || {}))
      .flat();
    if (!stateSearch) return allStates;
    return allStates.filter((state) =>
      state.toLowerCase().includes(stateSearch.toLowerCase())
    );
  }, [countries, filteredCountries, stateSearch]);

  const filteredCities = useMemo(() => {
    if (!filteredStates.length) return [];
    const allCities = filteredStates
      .map((state) =>
        Object.values(countries)
          .flatMap((country) => country[state] || [])
          .flat()
      )
      .flat();
    if (!citySearch) return allCities;
    return allCities.filter((city) =>
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [countries, filteredStates, citySearch]);

  // Handlers
  const debouncedSetCategorySearch = useCallback(
    debounce(setCategorySearch, 300),
    []
  );
  const debouncedSetCountrySearch = useCallback(debounce(setCountrySearch, 300), []);
  const debouncedSetStateSearch = useCallback(debounce(setStateSearch, 300), []);
  const debouncedSetCitySearch = useCallback(debounce(setCitySearch, 300), []);

  const handleClick = useCallback((path) => {
    router.push(path);
  }, [router]);

  const toggleDropdown = (key) => {
    setIsDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Header2 />
      <div className="p-6 container mx-auto max-w-screen-2xl mt-[100px] min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Categories and Locations
        </h1>

        {/* Category Dropdown */}
        <div className="relative mb-8" ref={(el) => (dropdownRefs.current.category = el)}>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Categories
          </label>
          <input
            type="text"
            className="border p-3 w-full rounded-lg shadow-sm"
            placeholder="Search categories and keywords..."
            onChange={(e) => debouncedSetCategorySearch(e.target.value)}
            onFocus={() => toggleDropdown("category")}
          />
          {isDropdownOpen.category && (
            <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
              {filteredCategories.map((item, idx) => (
                <div
                  key={`category-${idx}`}
                  className="p-4 cursor-pointer text-blue-600 hover:underline"
                  onClick={() =>
                    handleClick(`/category/${item.replace(/\s+/g, "-").toLowerCase()}`)
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Country Dropdown */}
        <div className="relative mb-8" ref={(el) => (dropdownRefs.current.country = el)}>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Countries
          </label>
          <input
            type="text"
            className="border p-3 w-full rounded-lg shadow-sm"
            placeholder="Search countries..."
            onChange={(e) => debouncedSetCountrySearch(e.target.value)}
            onFocus={() => toggleDropdown("country")}
          />
          {isDropdownOpen.country && (
            <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
              {filteredCountries.map((country, idx) => (
                <div
                  key={`country-${idx}`}
                  className="p-4 cursor-pointer text-blue-600 hover:underline"
                  onClick={() =>
                    handleClick(`/Country/${country.replace(/\s+/g, "-").toLowerCase()}`)
                  }
                >
                  {country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* State Dropdown */}
        <div className="relative mb-8" ref={(el) => (dropdownRefs.current.state = el)}>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            States
          </label>
          <input
            type="text"
            className="border p-3 w-full rounded-lg shadow-sm"
            placeholder="Search states..."
            onChange={(e) => debouncedSetStateSearch(e.target.value)}
            onFocus={() => toggleDropdown("state")}
          />
          {isDropdownOpen.state && (
            <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
              {filteredStates.map((state, idx) => (
                <div
                  key={`state-${idx}`}
                  className="p-4 cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleClick(`/state/${state.replace(/\s+/g, "-").toLowerCase()}`)}
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City Dropdown */}
        <div className="relative mb-8" ref={(el) => (dropdownRefs.current.city = el)}>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Cities
          </label>
          <input
            type="text"
            className="border p-3 w-full rounded-lg shadow-sm"
            placeholder="Search cities..."
            onChange={(e) => debouncedSetCitySearch(e.target.value)}
            onFocus={() => toggleDropdown("city")}
          />
          {isDropdownOpen.city && (
            <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto mt-2">
              {filteredCities.map((city, idx) => (
                <div
                  key={`city-${idx}`}
                  className="p-4 cursor-pointer text-blue-600 hover:underline"
                  onClick={() =>
                    handleClick(`/city/${city.replace(/\s+/g, "-").toLowerCase()}`)
                  }
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
