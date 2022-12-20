import React, { useState, useEffect } from 'react';
import { FunnelIcon, MagnifyingGlassIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import BreadCrumb from "../components/BreadCrumb";

import items from "../data/ItemsExample";
import DropDown from "../components/DropDown";
import {
  Routes,
  Route,
  Link,
  useSearchParams,
} from 'react-router-dom';

import MxBikesClient from "../services/MxBikesClient";
const mxBikesClient = new MxBikesClient();


export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modTypeOptions, setModTypeOptions] = useState([]);
  const [modTypeCategories, setModTypeCategories] = useState([]);
  const [mods, setMods] = useState([]);

  function setSearchParamsHandler(value){
    getMods();
    setSearchParams(value)
  }

  useEffect(() => {
    mxBikesClient.modType.getModTypes().then(result => setModTypeOptions(result.ModTypes));
    mxBikesClient.modTypeCategory.getModTypeCatergories().then(result => setModTypeCategories(result.ModTypeCategories));
  }, []);

  const handleChangeModType = event => {
    let result = {modType:event.target.value};
    if(searchParams.get("search")) result.search = searchParams.get("search")

    setSearchParamsHandler(result)
  };

  const handleChangeModTypeCategory = event => {
    let result = {modTypeCategory:event.target.value};
    if(searchParams.get("search")) result.search = searchParams.get("search")
    if(searchParams.get("modType")) result.modType = searchParams.get("modType")

    setSearchParamsHandler(result)
  };

  const handleSearch = event => {
    /*let url = new URLSearchParams(`?${event.target.value}`);

    if(searchParams.get("modType")) url.append("modType", searchParams.get("modType"))
    if(searchParams.get("modTypeCategory")) url.append("modTypeCategory", searchParams.get("modTypeCategory"))

    console.log(url.toString());*/
    let result = {search:event.target.value};
    if(searchParams.get("modType")) result.modType = searchParams.get("modType")
    if(searchParams.get("modTypeCategory")) result.modTypeCategory = searchParams.get("modTypeCategory")

    setSearchParamsHandler(result)
  };

  function modTypeCategoryOptions(){
    let selectedModTypeID = modTypeOptions.find(item => item.Name == searchParams.get("modType"))

    let options = [];
    if(selectedModTypeID) 
      options = modTypeCategories.filter(option => option.ModTypeID == selectedModTypeID.ID)

    return options;
  }

  function getMods(){
    let filter = {};

    if(searchParams.get("search")) filter.SearchText = searchParams.get("search")
    if(searchParams.get("modTypeCategory")) filter.ModTypeCategoryID = modTypeCategories.find(item => item.Name == searchParams.get("modTypeCategory")).ID

    console.log(filter);
    mxBikesClient.mod.searchMods(filter).then(r => setMods(r.mods));
  }

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
              <BreadCrumb Name={"Jersey & Pants"} Breadcrumbs={[{ id: 1, name: 'Rider', href: '#' }]} />
          </div>
          <div className="flex items-center justify-between border-b-2 border-gray-100 pb-6 md:justify-start md:space-x-10">
              <h1 className=" text-3xl font-bold tracking-tight text-gray-900">Explore Items</h1>
              <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
                  <div className="relative">
                      <input onBlur={handleSearch} type="text" id="voice-search" className="bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 text-sm rounded-lg   block w-full pr-8 p-2.5 " placeholder="Search Item..." required />
                      <div type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
                          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
                      </div>
                  </div>
                  <button onClick={getMods} className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ">
                      Filter <FunnelIcon className="ml-2 w-5 h-5" />
                  </button>
              </div>
          </div>

          <div>
            <DropDown Title="Type" Options={modTypeOptions} Select={searchParams.get("modType")} onChangeHandler={handleChangeModType} />
            <DropDown Title="Category" Options={modTypeCategoryOptions()} Select={searchParams.get("modTypeCategory")} onChangeHandler={handleChangeModTypeCategory} />
          </div>
        
        
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {mods.map((item, key) => (
              <div key={key} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={null}
                    alt={null}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={"Item/"+key}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.Name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{item.ReleaseYear}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
        
    );
}


/*
<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {mods.map((item, key) => (
            <div key={key} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={null}
                  alt={null}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={"Item/"+key}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.Name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.ReleaseYear}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

//<DropDown Options={modTypeCategoryOptions.filter(option => option.ModTypeID == (modTypeOptions.find(item => item.Name == searchParams.get("modType")).ID))} Select={searchParams.get("modTypeCategory")} onChangeHandler={handleChangeModTypeCategory} />
//(modTypeOptions.find(item => (item.Name == searchParams.get("modType")))

/*
<select className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {modTypeCategories.filter()((modTypeCategory, key) => (
              <option key={key} value={modTypeCategory.ID}>{modTypeCategory.Name}</option>
            ))}
          </select>
              <option key={key} value={key}>{category}</option>

<button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500" disabled="">
    <svg className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
</button>

<form>
    <label for="contrast-example" class="block text-sm font-medium text-slate-700">
        Social Security Number
    </label>
    <div class="mt-1">
        <input type="text" name="contrast-example" id="contrast-example" class="px-3 py-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" placeholder="000-00-0000" />
        <p class="mt-2 text-sm text-slate-600 opacity-10 contrast-more:opacity-100">We need this to steal your identity.</p>
    </div>
</form>
*/


/*
<div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
    <div>
        <label className="block text-sm font-medium text-slate-700">Category</label>
        <input type="text" name="contrast-example" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" placeholder="000-00-0000" />
    </div>

    <div>
        <label className="block text-sm font-medium text-slate-700">Brand</label>
        <input type="text" name="contrast-example" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" placeholder="000-00-0000" />
    </div>

    <div>
        <label className="block text-sm font-medium text-slate-700">Year</label>
        <select class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        <option>United States</option>
        <option>Canada</option>
        <option>Mexico</option>
      </select>
    </div>

    <div>
        <label className="block text-sm font-medium text-slate-700">Order</label>
        <input type="text" name="contrast-example" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 contrast-more:border-slate-400 contrast-more:placeholder-slate-500" placeholder="000-00-0000" />
    </div>
</div>
*/