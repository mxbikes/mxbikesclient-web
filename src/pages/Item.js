import { useParams } from "react-router-dom";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import BreadCrumb from "../components/BreadCrumb";

import items from "../data/ItemsExample";

const item = {
    images: [
        {
            src: "./images/itemExamples/helium_jersey-pants_front.png",
            alt: "Chromatic helium jersey/pants frontside",
        },
        {
            src: "./images/itemExamples/helium_jersey-pants_back.png",
            alt: "Chromatic helium jersey/pants backside",
        },
    ],
};

export default function App() {
    let { id } = useParams();

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                <BreadCrumb Name={items[id].name} Breadcrumbs={[{ id: 1, name: 'Rider', href: '#' }, { id: 2, name: 'Jersey & Pants', href: '/ItemStore' }]} />
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex gap-2 md:w-4/5 lg:w-1/2 h-auto">
                    <div className="rounded md:w-4/5 h-auto">
                        <img src={items[id].images[0].src} alt={item.images[0].alt} className="bg-slate-300 "/>
                    </div>

                    <div className="flex flex-col gap-2 md:basis-1/5 basis-1/2 max-h-sm">
                        <div className="bg-slate-200 rounded border-2 border-indigo-700 w-100">
                            <img src={items[id].images[0].src} alt={item.images[0].alt}/>
                        </div>
                        <div className="bg-slate-200 rounded ">
                            <img src={items[id].images[1].src} alt={item.images[1].alt}/>
                        </div>
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
    );
}
/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img src={item.images[1].src} alt={item.images[1].alt} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img src={item.images[0].src} alt={item.images[0].alt} className="h-full w-full object-cover object-center" />
                        </div>
                    </div>*/

/* 
                    <div className="flex">
                    <div>
                        <img src={item.images[0].src} alt={item.images[0].alt} className="h-30 w-full object-cover object-center" />
                    </div>

                    <div className="bg-zinc-900 mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <img src={item.images[0].src} alt={item.images[0].alt} className="h-full w-full object-cover object-center" />
                    </div>
                </div>*/
