import React, { useState, useEffect, useRef } from 'react';
import { FunnelIcon, MagnifyingGlassIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import BreadCrumb from "../components/BreadCrumb";

import items from "../data/ItemsExample";
import Pagination from "../components/Pagination";
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
  const handleSetSearchParamsWithModUpdate = (value) => {
    setSearchParams(value);
    updateModsBasedOnParams(value);
  }

  const [breadCrumb, setBreadCrumb] = useState([]);

  // Mod Type
  const [modTypeOptions, setModTypeOptions] = useState([]);
  const modTypeOptionsRef = useRef();
  modTypeOptionsRef.current = modTypeOptions;

  // Mod Type Categories
  const [modTypeCategoryOptions, setModTypeCategoryOptions] = useState([]);
  const modTypeCategoryOptionsRef = useRef();
  modTypeCategoryOptionsRef.current = modTypeCategoryOptions;

  // Mods
  const [mods, setMods] = useState([]);

  // When start get all 
  useEffect(() => {
    mxBikesClient.modType.getModTypes().then(async result => {
      await setModTypeOptions(result.ModTypes)
    });
  }, []);

  useEffect(() => {
    if(searchParams.get("modType") && modTypeOptionsRef.current.length > 0){
      let selectedModTypeID = modTypeOptionsRef.current.find(item => item.Name == searchParams.get("modType"))
      if(selectedModTypeID.ID)
        mxBikesClient.modTypeCategory.getModTypeCategoriesByModTypeID(selectedModTypeID.ID).then(result => {
        setModTypeCategoryOptions(result.ModTypeCategories)
      });
    }
  }, [modTypeOptions]);

  useEffect(() => {
    let params = {
      searchText: searchParams.get("searchText") || "",
      modType:  searchParams.get("modType") || "",
      modTypeCategory:  searchParams.get("modTypeCategory") || ""
    }
    updateModsBasedOnParams(params)

    let count = 1;
    let breadCrumb = [{ id: count++, name: 'ItemStore', href: '/ItemStore' }]
    if(searchParams.get("modType"))
      breadCrumb.push({ id: count++, name: searchParams.get("modType"), href: `/ItemStore?searchText=&modType=${searchParams.get("modType")}&modTypeCategory=` })

    if(searchParams.get("modTypeCategory"))
      breadCrumb.push({ id: count++, name: searchParams.get("modTypeCategory"), href: `/ItemStore?searchText=&modType=${searchParams.get("modType")}&modTypeCategory=${searchParams.get("modTypeCategory")}` })

    setBreadCrumb(breadCrumb);
  }, [modTypeOptions, modTypeCategoryOptions]);
  


  /* Handlers */
  const handleChangeModTypeOptions = event => {
    let selectedModType = event.target.value
    let selectedModTypeID = modTypeOptions.find(item => item.Name == selectedModType)

    handleSetSearchParamsWithModUpdate({
      searchText: searchParams.get("searchText") || "",
      modType: selectedModType,
      modTypeCategory: ""
    })

    if(selectedModTypeID.ID)
    mxBikesClient.modTypeCategory.getModTypeCategoriesByModTypeID(selectedModTypeID.ID).then(result => {
      console.log(result);
      setModTypeCategoryOptions(result.ModTypeCategories)
    });
  };

  const handleChangeModTypeCategoryOptions = event => {
    let selectedModTypeCategory = event.target.value

    handleSetSearchParamsWithModUpdate({
      searchText: searchParams.get("searchText") || "",
      modType: searchParams.get("modType") || "",
      modTypeCategory: selectedModTypeCategory
    })
  };

  const handleSearchMod = event => {
    let searchText = event.target.value;
    handleSetSearchParamsWithModUpdate({
      searchText,
      modType: searchParams.get("modType") || "",
      modTypeCategory: searchParams.get("modTypeCategory") || ""
    })
  };

  
  const updateModsBasedOnParams = async (requestFilter) => {
    let filter = {
      SearchText: requestFilter.searchText,
      ModTypeCategoryIDs: []
    };

    if(requestFilter.modTypeCategory) {
      console.log('modTypeCategory')
      if(modTypeCategoryOptionsRef.current.length > 0)
        filter.ModTypeCategoryIDs = [modTypeCategoryOptionsRef.current.find(item => item.Name == requestFilter.modTypeCategory).ID];
    } else if (requestFilter.modType) {
      console.log('modType')
      let selectedModTypeID = modTypeOptionsRef.current.find(item => item.Name == requestFilter.modType)

      if(selectedModTypeID){
        let modTypeCategories = (await mxBikesClient.modTypeCategory.getModTypeCategoriesByModTypeID(selectedModTypeID.ID)).ModTypeCategories;
        let modTypeCategoryIDs = []
        for (const modTypeCategory of modTypeCategories) {
          modTypeCategoryIDs.push(modTypeCategory.ID)
        }
  
        filter.ModTypeCategoryIDs = modTypeCategoryIDs;
      }
    }
    console.log(filter)
    mxBikesClient.mod.searchMods(filter).then(result => setMods(result.mods));
  }

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <BreadCrumb Breadcrumbs={breadCrumb} />
        </div>

          <div>
            <DropDown Title="Type" options={modTypeOptions} select={searchParams.get("modType")} onChangeHandler={handleChangeModTypeOptions} />
            <DropDown Title="Category" options={modTypeCategoryOptions} select={searchParams.get("modTypeCategory")} onChangeHandler={handleChangeModTypeCategoryOptions} />
          </div>
          
          <input placeholder='search' value={searchParams.get("searchText") || ""} onChange={handleSearchMod}/>

          {mods && mods.map((mod, key) => (
            <div key={key}>
              {mod.Name}
            </div>
          ))}

          <Pagination />
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