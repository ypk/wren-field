<table id="animalSpawned" class="table table-bordered">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Parents</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <% for(var i = 0; i < animals.length; i++) { %>
            <%= animals[i].render() %>
        <% } %>
    </tbody>
</table>
