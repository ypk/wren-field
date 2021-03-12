define(['tpl!templates/sheep.tpl'], function(template) {
    var Sheep = function(name, sex) {
        this._name = name;
        this._sex = sex;

        this.setId = function(id) {
            this._id = id;
        };

        this.render = function() {
            return template({
                'id': this._id,
                'name': this._name,
                'sex': this._sex
            });
        };
    };
    return Sheep;
});
