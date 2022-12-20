function mod(client){
    this.client = client;
}

mod.prototype.searchMods = async function (filter) {
    return await this.client.post(`/v1/mods`, filter);
};

mod.prototype.getModByID = async function (modID) {
    return await this.client.get(`/v1/mods/${modID}`);
};

export default mod;