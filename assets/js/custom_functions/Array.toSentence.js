if (!Array.prototype.toSentence) {
    Array.prototype.toSentence = function (conjunction = 'and') {
        let oxford = this.length > 2 ? (', ' + conjunction + ' ') : (' ' + conjunction + ' ');
        return this.slice(0, -2).join(', ') + (this.slice(0, -2).length ? ', ' : '') + this.slice(-2).join(oxford);
    };
}