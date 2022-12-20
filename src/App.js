//import logo from "./logo.svg";

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import NotFound from "./pages/NotFound";
import ItemStore from "./pages/ItemStore";
import Item from "./pages/Item";

import Navbar from "./components/Navbar";

import MxBikesClient from "./services/MxBikesClient";
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


function App() {


		return (
				<div>
						<Navbar />
						<Routes>
								<Route path="*" element={<NotFound />} />
								<Route path="/ItemStore" element={<ItemStore />} />
								<Route path="/Item/:id" element={<Item />} />
						</Routes>
				</div>
		);
}

export default App;
