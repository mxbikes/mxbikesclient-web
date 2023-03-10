import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ArrowPathIcon, Bars3Icon, BookmarkSquareIcon, CalendarIcon, ChartBarIcon, CursorArrowRaysIcon, LifebuoyIcon, PhoneIcon, PlayIcon, ShieldCheckIcon, Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ScaleIcon } from "@heroicons/react/20/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { json } from "react-router-dom";

import AuthenticationButtons from "../components/AuthenticationButtons";

const itemStore = [
    {
        name: "Helmets and goggles",
        description: "",
        href: "#",
        icon: ChartBarIcon,
    },
    {
        name: "Jersey and Pants",
        description: "",
        href: "#",
        icon: CursorArrowRaysIcon,
    },
    { name: "Boots", description: "", href: "#", icon: ShieldCheckIcon },
    {
        name: "Gloves",
        description: "",
        href: "#",
        icon: Squares2X2Icon,
    },
];
const callsToAction = [
    { name: "Watch Demo", href: "#", icon: PlayIcon },
    { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const resources = [
    {
        name: "Help Center",
        description: "Get all of your questions answered in our forums or contact support.",
        href: "#",
        icon: LifebuoyIcon,
    },
    { name: "Security", description: "Understand how we take your privacy seriously.", href: "#", icon: ShieldCheckIcon },
    { name: "Terms", description: "Understand how we take your privacy seriously.", href: "#", icon: ScaleIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    

    /*if (isLoading) {
        return <div>Loading ...</div>;
    }*/

    return (
        <Popover className="relative bg-white border-b-2 border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10">
                    <div>
                        <a href="/">
                            <span className="sr-only">MxBikes Client</span>
                            <img className="h-8 w-auto sm:h-8" src="/logo.svg" alt="" />
                        </a>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                        <a href="/ItemStore" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            ItemStore
                        </a>

                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button className={classNames(open ? "text-gray-900" : "text-gray-500", "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2")}>
                                        <span>More</span>
                                        <ChevronDownIcon className={classNames(open ? "text-gray-600" : "text-gray-400", "ml-2 h-5 w-5 group-hover:text-gray-500")} aria-hidden="true" />
                                    </Popover.Button>

                                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    {resources.map((item) => (
                                                        <a key={item.name} href={item.href} className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                                                            <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </Popover.Group>

                    {/* Authentication Buttons */}
                    <AuthenticationButtons />
                </div>
            </div>

            <Transition as={Fragment} enter="duration-200 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img className="h-8 w-auto" src="/logo.svg" alt="MxBikes Client" />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {itemStore.map((item) => (
                                        <a key={item.name} href={item.href} className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                                            <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                            <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Pricing
                                </a>

                                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Docs
                                </a>
                                {resources.map((item) => (
                                    <a key={item.name} href={item.href} className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div>
                                <a href="#" className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                    Sign up
                                </a>
                                <p className="mt-6 text-center text-base font-medium text-gray-500">
                                    Existing customer?{" "}
                                    <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}
