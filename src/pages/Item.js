import { json, useParams, useSearchParams } from "react-router-dom";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import BreadCrumb from "../components/BreadCrumb";
import React, { useState, useEffect, useRef } from "react";

import items from "../data/ItemsExample";
import CommentSection from "../components/CommentSection";

import MxBikesClient from "../services/MxBikesClient";
const mxBikesClient = new MxBikesClient();

const item = {
    images: [
        {
            src: "http://localhost:9000/mod-images/85fc52b9-9453-4e49-9637-ca944f9ca7da_heliumChromaticJerseyPantsFront.png",
            alt: "Chromatic helium jersey/pants frontside",
        },
        {
            src: "http://localhost:9000/mod-images/85fc52b9-9453-4e49-9637-ca944f9ca7da_heliumChromaticJerseyPantsBack.png",
            alt: "Chromatic helium jersey/pants backside",
        },
    ],
};

export default function App() {
    let { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [images, setImages] = useState(item.images);
    const [activeImage, setActiveImage] = useState(item.images[0]);

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                    <BreadCrumb
                        Name={items[id].name}
                        Breadcrumbs={[
                            { id: 1, name: "Rider", href: "#" },
                            { id: 2, name: "Jersey & Pants", href: "/ItemStore" },
                        ]}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex gap-2 md:w-4/5 lg:w-1/2 h-auto">
                        <div className="rounded md:w-4/5 h-auto">
                            <img src={activeImage.src} alt={activeImage.alt} className="bg-slate-300 " />
                        </div>

                        <div className="flex flex-col gap-2 md:basis-1/5 basis-1/2 max-h-sm">
                            {images && images.map((image, key) => (
                                <div onClick={() => setActiveImage(image)} key={key} className={(image == activeImage)?"bg-slate-200 rounded border-2 border-indigo-700 w-100":"bg-slate-200 rounded cursor-pointer"}>
                                    <img src={image.src} alt={image.alt} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h1 className=" text-3xl font-bold tracking-tight text-gray-900">{items[id].name}</h1>
                        <p>2022</p>
                        <p className="my-3">{items[id].description}</p>
                        <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500" disabled="">
                            <svg className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </button>
                    </div>
                </div>
            </div>

            <CommentSection />
        </div>
    );
}
