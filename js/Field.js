define(['tpl!templates/field.tpl'], function(template) {
    var Field = function() {
        this._uid = 0;
        this._animals = [];

        this.add = function(animal) {
            animal.setId(++this._uid);
            this._animals.push(animal);
        };

        this.render = function() {
            return template({'animals': this._animals});
        };
    };
    return Field;
});
