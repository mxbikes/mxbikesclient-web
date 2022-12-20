function modImages(client){
    this.client = client;
}

modImages.prototype.getmodImagesByID = async function (modID) {
    return await this.client.get(`/v1/modImages/${modID}`);
};

export default modImages;