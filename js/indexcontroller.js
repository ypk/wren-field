define(['Field', 'Sheep'], function(Field, Sheep) {
    var addFemaleSheepNode = document.getElementById('addFemaleSheep');
    var fieldNode = document.getElementById('fieldContainer');

    // create a field, passing the node to render html to
    var field = new Field();

    // render the field html
    fieldNode.innerHTML = field.render();

    addFemaleSheepNode.addEventListener('click', function(e) {
        // add an example female sheep
        var sheep = new Sheep('Jenny', 'Female');
        field.add(sheep);
        fieldNode.innerHTML = field.render();
    });
});
