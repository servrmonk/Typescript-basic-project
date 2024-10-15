import { BsFilterLeft } from "react-icons/bs";
import { LiaSearchengin } from "react-icons/lia";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineDown } from "react-icons/ai";
import { data } from "../utils/data";
import React, { useState } from "react";

interface PersonInfo {
  client: string;
  country: string;
  email: string;
  project: string;
  progress: string;
  status: string;
  date: string;
  image: string;
}


export default function MainComponent() {
  const [sortDownVisible, setSortDownVisible] = useState(false);
  const [filterDownVisible, setFilterDownVisible] = useState(false);
  const [filters, setFilters] = useState({
    name: "", country: "", email: "", project: "", status: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const [personInfo, setPersonInfo] = useState(data);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters, [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = personInfo.filter(
    (info) =>
      (searchQuery === "" ||
        Object.values(info).some((value) =>
          value.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (filters.name === "" ||
        info.client.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.country === "" ||
        info.country.toLowerCase().includes(filters.country.toLowerCase())) &&
      (filters.email === "" ||
        info.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.project === "" ||
        info.project.toLowerCase().includes(filters.project.toLowerCase())) &&
      (filters.status === "" ||
        info.status.toLowerCase().includes(filters.status.toLowerCase()))
  );

  const sortData = (key: keyof PersonInfo) => {
    let sortedData = [...personInfo];
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      sortedData.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      setSortConfig({ key, direction: "descending" });
    } else {
      sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({ key, direction: "ascending" });
    }
    setPersonInfo(sortedData);
  };

  const handleSortOptionClick = (key: keyof PersonInfo) => {
    sortData(key);
    setSortDownVisible(false);
  };

  // Paginationn features
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pgNum: number) => setCurrentPage(pgNum);

  return (
    <div className="mt-3 p-1 w-[93%]">
      <div className="flex items-center space-x-2">
        {/* Sorting */}
        <div className="relative ">
          <button onClick={() => setSortDownVisible(!sortDownVisible)} className="flex items-center border p-2 rounded-lg border-slate-500 space-x-1">
            <TbArrowsSort />
            <span>Sort</span>
            <AiOutlineDown />
          </button>
          {sortDownVisible && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
              <button onClick={() => handleSortOptionClick("client")} className="block px-4 py-2 text-white w-full hover:bg-gray-700">Name</button>
              <button onClick={() => handleSortOptionClick("country")} className="block px-4 py-2 text-white w-full hover:bg-gray-700">Country</button>
              <button onClick={() => handleSortOptionClick("date")} className="block px-4 py-2 text-white w-full hover:bg-gray-700">Date</button>
            </div>
          )}
        </div>
        {/* Filter */}
        <div className="relative">
          <button onClick={() => setFilterDownVisible(!filterDownVisible)} className="flex space-x-1 items-center border p-2 rounded-lg border-slate-500">
            <BsFilterLeft />
            <span>Filter</span>
            <AiOutlineDown />
          </button>
          {filterDownVisible && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg p-4 z-10">
              <input onChange={handleFilterChange} name="name" value={filters.name} placeholder="Filter by Name" className="bg-gray-900 text-white rounded mb-1" type="text" />
              <input onChange={handleFilterChange} name="country" value={filters.country} placeholder="Filter by Country" className="bg-gray-900 text-white rounded mb-1" type="text" />
              <input onChange={handleFilterChange} name="email" value={filters.email} placeholder="Filter by Email" className="bg-gray-900 text-white rounded mb-1" type="text" />
              <input onChange={handleFilterChange} name="project" value={filters.project} placeholder="Filter by Project" className="bg-gray-900 text-white rounded mb-1" type="text" />
              <input onChange={handleFilterChange} name="status" value={filters.status} placeholder="Filter by Status" className="bg-gray-900 text-white rounded" type="text" />
            </div>
          )}
        </div>
        {/* Search */}
        <form className="relative flex items-center w-full">
          <input
            type="text"
            className="bg-gray-900 border ml-2 border-slate-400 text-white rounded-lg w-[600px] p-2"
            placeholder="Search..."
            value={searchQuery}
            onFocus={() => {
              setSortDownVisible(false)
              setFilterDownVisible(false)
            }}
            onChange={handleSearchChange}
          />
          <button className="ml-1 bg-slate-500 hover:bg-slate-700 hover:text-cyan-500 rounded-lg p-2 text-2xl">
            <LiaSearchengin />
          </button>
        </form>
      </div>

      <table className="mt-5 table-auto relative w-[98%] border border-slate-500">
        <thead>
          <tr>
            <th className="py-3 pl-2 text-left">Image</th>
            <th className="py-3 text-left">Name</th>
            <th className="py-3 pl-4 text-left">Country</th>
            <th className="py-3 text-left">Email</th>
            <th className="py-3 text-left">Project Name</th>
            <th className="py-3 text-left">Task Progress</th>
            <th className="py-3 pl-7 text-left">Status</th>
            <th className="py-3 pl-7 text-left">Date</th>
            <th className="py-3 pr-1 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => (
            <tr className="border border-slate-500" key={index}>
              <td className="p-2">
                <img
                  src={item.image}
                  alt={item.client}
                  className="w-12 h-12 rounded-full hover:w-12"
                />
              </td>
              <td className="w-7 text-left">{item.client}</td>
              <td className="pl-4 text-left">{item.country}</td>
              <td className="w-16 pr-5 text-left">{item.email}</td>
              <td className="w-10 px-1 text-left">{item.project}</td>
              <td className="w-12 pl-4 text-center">
                <div className={`w-[${item.progress}] h-2 bg-green-500 rounded`}></div>
              </td>
              <td className="pr-2 text-center">{item.status}</td>
              <td className="text-center">{item.date}</td>
              <td className="text-center pr-9">---</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination.. */}
      <div className="flex justify-end mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50 disabled:cursor-no-drop"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded ml-2 disabled:opacity-50 disabled:cursor-no-drop"
        >
          Next
        </button>
      </div>
    </div>
  );
}
