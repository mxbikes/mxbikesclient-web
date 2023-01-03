//import logo from "./logo.svg";

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

/* Pages */
import NotFound from "./pages/NotFound";
import ItemStore from "./pages/ItemStore";
import Item from "./pages/Item";
import Home from "./pages/Home";

import { Auth0Provider } from "@auth0/auth0-react";
import Profile from "./components/Profile";

import Navbar from "./components/Navbar";

import MxBikesClient from "./services/MxBikesClient";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
const mxBikesClient = new MxBikesClient();
//mxBikesClient.mod.getModByID("85fc52b9-9453-4e49-9637-ca944f9ca7da").then(r => console.log(r))
//mxBikesClient.mod.getModByID("85fc52b9-9453-4e49-9637-ca944f9ca7da").then(r => console.log(r))
/*mxBikesClient.mod.searchMods({
    SearchText: "fxr",
    Page: 1,
    Size: 10
}).then(r => console.log(r))

mxBikesClient.mod.searchMods({
    SearchText: "fxr",
    Page: 1,
    Size: 10
}).then(r => console.log(r))*/

//mxBikesClient.comment.GetCommentByModID("6cde3b99-e551-43ff-aa66-bf263c03e680").then(r => console.log(r))


function App() {


		return (
			<Auth0Provider domain="dev-tm250wxm.us.auth0.com" clientId="lGwbirFTAn7ibMgkiWAha73mlgij1h5k" redirectUri={window.location.origin} cacheLocation="localstorage" audience="https://dev-tm250wxm.us.auth0.com/api/v2/" scope="read:users">
					<Profile />
					
					<Auth0Provider />
						<Navbar />
						<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/ItemStore" element={<ItemStore />} />
								<Route path="/Item/:id" element={<Item />} />
								<Route path="*" element={<NotFound />} />
						</Routes>
				</Auth0Provider>
		);
}

export default App;
