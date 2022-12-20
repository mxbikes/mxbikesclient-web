import React, { useState, useEffect } from 'react';
import { FunnelIcon, MagnifyingGlassIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import BreadCrumb from "../components/BreadCrumb";

import items from "../data/ItemsExample";

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

  useEffect(() => {
    mxBikesClient.modType.getModTypes().then(result => setModTypeOptions(result.ModTypes));
    mxBikesClient.modTypeCategory.getModTypeCatergories().then(result => setModTypeCategories(result.ModTypeCategories));

    console.log('asd');
  }, []);

  const handleChangeModType = event => {
    setSearchParams({modType:event.target.value})
  };

    return (
        <div>
          <select onChange={handleChangeModType} className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {modTypeOptions.map((modType) => (
              <option key={modType.Name} value={modType.Name}>{modType.Name}</option>
            ))}
          </select>
          
          <select className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Select --</option>
          {searchParams.get("modType") && modTypeCategories.filter(modTypeCategory => (modTypeCategory.ModTypeID == (modTypeOptions.find(item => (item.Name == searchParams.get("modType"))).ID))).map(modTypeCategory => (
            <option key={modTypeCategory.Name} value={modTypeCategory.Name}>{modTypeCategory.Name}</option>
          ))}
          </select>
          
          {searchParams.get('modType')}

          
        </div>
    );
}

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