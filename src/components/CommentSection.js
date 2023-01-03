import Comment from "../components/Comment";
import RemoveComment from "./CommentRemoveModal";
import CommentEditModal from "./CommentEditModal";
import React, { useState, useEffect, useRef } from "react";
import { json, useParams, useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import MxBikesClient from "../services/MxBikesClient";
const mxBikesClient = new MxBikesClient();

export default function CommentSection() {
    let { id } = useParams();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [comments, setComments] = useState();
    const [selectedComment, setSelectedComment] = useState();
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        mxBikesClient.comment.GetCommentByModID(id).then((result) => {
            setComments(result.Comments);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(user);
        mxBikesClient.comment.CreateComment({
            ModID: id,
            UserID: user.sub,
            Text: event.target.comment.value,
        });
    };

    const handleRemoveComment = () => {
        if (selectedComment)
            mxBikesClient.comment.DeleteComment(selectedComment.ID).then((r) => {
                mxBikesClient.comment.GetCommentByModID(id).then((result) => {
                    setComments(result.Comments);
                });
            });
        setRemoveModalVisible(false);
    };

    const handleEditComment = (event) => {
        let comment = { ...selectedComment };
        comment.Text = event.target.comment.value;
        mxBikesClient.comment.UpdateComment(comment).then((r) => console.log(r));
    };

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 mt-10">
            
            <RemoveComment isOpen={removeModalVisible} setIsOpen={setRemoveModalVisible} handle={handleRemoveComment} />
            <CommentEditModal isOpen={editModalVisible} setIsOpen={setEditModalVisible} handle={handleEditComment} value={selectedComment && selectedComment.Text} />

            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments && comments.length})</h2>
                    
                </div>

                <p className={(isAuthenticated)?"hidden":"text-gray-500 mb-6"}>To place a comment you need to login!</p>

                <form onSubmit={handleSubmit} className={(!isAuthenticated)?"hidden":"mb-6"}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea name="comment" id="comment" rows="6" className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit" className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        Post comment
                    </button>
                </form>

                

                {!comments && (
                    <div className="text-center mt-10">
                        <div role="status">
                            <svg className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}

                {comments &&
                    comments.map((comment, key) => (
                        <Comment
                            key={key}
                            comment={comment}
                            handleRemove={(commentID) => {
                                setRemoveModalVisible(true);
                                setSelectedComment(commentID);
                            }}
                            handleEdit={(commentID) => {
                                setEditModalVisible(true);
                                setSelectedComment(commentID);
                            }}
                        />
                    ))}
            </div>
        </section>
    );
}
