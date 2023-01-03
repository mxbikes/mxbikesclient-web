import { Menu } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import MxBikesClient from "../services/MxBikesClient";
const mxBikesClient = new MxBikesClient();

export default function Comment({ comment, handleRemove, handleEdit }) {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [commentUser, setCommentUser] = useState();
  
  useEffect(() => {
    if(comment.UserID)
      mxBikesClient.user.GetUserByID(comment.UserID).then((result) => {
        setCommentUser(result.User)
      });
  }, []);

  return (
    <article className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        {/* Profile */}
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img className="mr-2 w-6 h-6 rounded-full" src={commentUser?commentUser.Picture:"https://storage.planner5d.com/ud/e997a22aff5980f534db552d310776ee.jpg?v=1620787001"} alt="User"/>
            {commentUser?commentUser.Name:"unkown"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate="true" dateTime="2022-02-08" title="February 8th, 2022">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              }).format(Comment.Create_At)}
            </time>
          </p>
        </div>
        <div className={(isAuthenticated && user.sub == comment.UserID)?"relative":"hidden"}>
          <Menu>
            <Menu.Button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
              <span className="sr-only">Comment settings</span>
            </Menu.Button>

            {/* Options */}
            <Menu.Items className="absolute z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-1 text-left text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                <li>
                  <a onClick={() => handleEdit(comment)} className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Edit
                  </a>
                </li>
                <li>
                  <a onClick={() => handleRemove(comment)} className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Remove
                  </a>
                </li>
              </ul>
            </Menu.Items>
          </Menu>
        </div>
      </footer>

      {/* Text */}
      <p className="text-gray-500 dark:text-gray-400">{comment.Text}</p>
    </article>
  );
}
