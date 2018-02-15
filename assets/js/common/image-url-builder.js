const Builder = function (url, params) {

    this.url    = url;
    this.params = params || {};

};

Builder.prototype.width = function (width) {
    this.params.w = width;
    return this;
};

Builder.prototype.height = function (height) {
    this.params.h = height;
    return this;
};

Builder.prototype.crop = function (method) {
    this.params.crop = method;
    return this;
};

Builder.prototype.fit = function (method) {
    this.params.fit = method;
    return this;
};

Builder.prototype.get_url = function () {

    let params = [];

    for (let key in this.params) {
        if (this.params.hasOwnProperty(key))
            params.push(key + '=' + this.params[key]);
    }

    return this.url + (params.length ? '?' : '') + params.join('&');
};

export default Builder;