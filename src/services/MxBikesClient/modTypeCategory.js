function modTypeCategory(client){
    this.client = client;
}

modTypeCategory.prototype.getModTypeCatergories = async function () {
    return await this.client.get(`/v1/modTypeCategory`);
};

modTypeCategory.prototype.getModTypeCategoryByID = async function (modTypeCategoryID) {
    return await this.client.get(`/v1/modTypeCategory/${modTypeCategoryID}`);
};

modTypeCategory.prototype.getModTypeCategoriesByModTypeID = async function (modTypeID) {
    return await this.client.post(`/v1/modTypeCategory`, { ModTypeID:modTypeID });
};

export default modTypeCategory;