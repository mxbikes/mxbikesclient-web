function modType(client){
    this.client = client;
}

modType.prototype.getModTypes = async function () {
    return await this.client.get(`/v1/modType`);
};

modType.prototype.getModTypeByID = async function (modTypeID) {
    return await this.client.get(`/v1/modType/${modTypeID}`);
};

export default modType;