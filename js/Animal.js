define(['tpl!templates/animal.tpl'], function(template) {
    var Animal = function(name, sex, type, parent) {
        this._name = name;
        this._sex = sex;
	this._type = type,
	this._parent = (typeof(parent) !== "undefined") ? parent : "N/A";
        this.setId = function(id) {
            this._id = id;
        };

        this.render = function() {
            return template({
                'id': this._id,
                'name': this._name,
                'sex': this._sex,
		'parent': this._parent,
		'type': this._type
            });
        };
    };
    return Animal;
});
