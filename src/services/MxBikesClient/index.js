import mod from './mod';
import modType from './modType';
import modTypeCategory from './modTypeCategory';
import modImages from './modImages';
import comment from './comment';
import user from './user';

// Main function
function client(){
    this.mod = new mod(this);
    this.modType = new modType(this);
    this.modTypeCategory = new modTypeCategory(this);
    this.modImages = new modImages(this);
    this.comment = new comment(this);
    this.user = new user(this);
}

// Methods
client.prototype.get = function (path) { 
    return this.request(path, "GET");
}; 

client.prototype.post = function (path, body) {
    return this.request(path, "POST", body);
};

client.prototype.delete = function (path, body) {
    return this.request(path, "DELETE");
};

client.prototype.put = function (path, body) {
    return this.request(path, "PUT", body);
};

// Request
client.prototype.request = async function (path, method, body) {
    const url = new URL("http://localhost:4105"+path);

    var options = {
        method,
    };

    if (method === "POST" || method === "PUT") 
        options.body = JSON.stringify(body);

    return new Promise((resolve, reject) => {
    fetch(url, options)
        .then(async (response) => {
            let json = await response.json();
            resolve(json)
        })
        .then((data) => reject(data));
    });
};

export default client;