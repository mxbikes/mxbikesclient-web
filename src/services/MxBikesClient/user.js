function user(client){
    this.client = client;
}

user.prototype.GetUserByID = async function (id) {
    return await this.client.get(`/v1/users/${id}`);
};


export default user;