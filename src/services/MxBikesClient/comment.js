function comment(client){
    this.client = client;
}

comment.prototype.CreateComment = async function (comment) {
    return await this.client.post(`/v1/comments`, comment);
};

comment.prototype.UpdateComment = async function (comment) {
    return await this.client.put(`/v1/comments`, comment);
};

comment.prototype.DeleteComment = async function (commentID) {
    return await this.client.delete(`/v1/comments/${commentID}`);
};

comment.prototype.GetCommentByModID = async function (commentID) {
    let request = new URLSearchParams();
    if(commentID) request.append("ModID", commentID)

    return await this.client.get(`/v1/comments?${request.toString()}`);
};

export default comment;