/*

 */
var DBPreparedParams = function(name, value, type)
{
    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {string}
     */
    this.value= value;
    /**
     * @type {string} string|number|date
     */
    this.type = type;

};

module.exports = DBPreparedParams;