import React, { useState, useEffect, useRef } from "react";
import { FunnelIcon, MagnifyingGlassIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import BreadCrumb from "../components/BreadCrumb";

import items from "../data/ItemsExample";
import Pagination from "../components/Pagination";
import ItemCard from "../components/ItemCard";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";

import MxBikesClient from "../services/MxBikesClient";
const mxBikesClient = new MxBikesClient();

export default function App() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [breadCrumb, setBreadCrumb] = useState([]);
    const [mods, setMods] = useState([]);

    useEffect(() => {
        let searchText = searchParams.get("searchText");
        mxBikesClient.mod.searchMods({ SearchText: `%${searchText}%` }).then((result) => setMods(result.mods));
    }, [searchParams.get("searchText")]);

    const handleSearchMod = (event) => {
        let searchText = event.target.value;
        setSearchParams({ searchText });
        mxBikesClient.mod.searchMods({ SearchText: `%${searchText}%` }).then((result) => setMods(result.mods));
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                <BreadCrumb Breadcrumbs={breadCrumb} />
            </div>

            <input placeholder="search" value={searchParams.get("searchText") || ""} onChange={handleSearchMod} />

            <div className="bg-white">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{mods && mods.map((mod, key) => <ItemCard key={key} item={mod}/>)}
				</div>
            </div>
        </div>
    );
}
