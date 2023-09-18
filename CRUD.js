$(document).ready(function() {
    displayEmployees();
    displayDepartment();
    displayLocation();

/*-------------------------------------------------------------------------------------------
------------------------------------FILTER EMPLOYEES-----------------------------------------
-------------------------------------------------------------------------------------------*/

    $('#searchEmployee').keyup(function() {
        var value = $(this).val().toLowerCase();
        $('#employee-table tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    });
})

/*-------------------------------------------------------------------------------------------
------------------------ADDING DEPARTMENTS DYNAMICALLY TO TABLE------------------------------
-------------------------------------------------------------------------------------------*/
    
function displayDepartment() {
    $.ajax({
        url: 'data/getDepartment.php',
        method: 'GET',
        success: function(result) {

            var d = result['data'];

            $('#department-table').html(
                `<table class="table">
                    <thead class="table-dark sticky-top">
                        <tr>
                            <th scope="col" hidden>Id</th>
                            <th scope="col">Department</th>
                            <th scope="col">Location ID</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="department-data">
                    </tbody>
                </table>`
            )

            for (var i = 0; i < result['data'].length; i++) {
                $('#department-data').append(
                    `<tr>
                        <td scope="row" hidden>${d[i]['id']}</td>
                        <td>${d[i]['name']}</td>
                        <td>${d[i]['locationID']}</td>
                        <td><button type="button" data-bs-toggle="modal" data-bs-target="#departmentModal" data-id="${d[i]['id']}" class="btn btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></button></td>
                        <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="${d[i]['id']}"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>`
                )

/*-------------------------------------------------------------------------------------------
-----------------------ADDING OPTIONS DYNAMICALLY TO DEPARTMENT------------------------------
-------------------------------------------------------------------------------------------*/

                $('#addDepartment').append(
                    `<option value="${d[i]['id']}">${d[i]['name']}</option>`
                )
                $('#department').append(
                    `<option value="${d[i]['id']}">${d[i]['name']}</option>`
                )
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
}

/*-------------------------------------------------------------------------------------------
------------------------ADDING EMPLOYEES DYNAMICALLY TO TABLE--------------------------------
-------------------------------------------------------------------------------------------*/

function displayEmployees() {
    $.ajax({
        url: 'data/getAll.php',
        method: 'GET',
        dataType: 'json',
        success: function(result) {

            if (result.status.name == 'ok') {

            var d = result['data'];

            $('#employee-table').html(
                `<table class="table">
                    <thead class="table-dark sticky-top">
                        <tr>
                            <th scope="col" hidden>Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col" class="collapsed">Job Title</th>
                            <th scope="col" class="collapsed">E-mail</th>
                            <th scope="col" class="collapsed">Department</th>
                            <th scope="col" class="collapsed">Location</th>
                            <th colspan="2">Operations</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="employee-data">
                    </tbody>
                </table>`
            );

            for (var i = 0; i < d.length; i++) {
                $('#employee-data').append(
                    `<tr>
                        <td scope="row" hidden>${d[i]['id']}</td>
                        <td>${d[i]['firstName']}</td>
                        <td>${d[i]['lastName']}</td>
                        <td class="collapsed">${d[i]['jobTitle']}</td>
                        <td class="collapsed">${d[i]['email']}</td>
                        <td id="departmentEmployee" class="collapsed">${d[i]['department']}</td>
                        <td id="locationEmployee" class="collapsed">${d[i]['location']}</td>
                        <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-id="${d[i]['id']}"><i class="fa-solid fa-pen-to-square"></i></button></td>
                        <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" data-id="${d[i]['id']}"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>`
                )
            }
        }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
}

/*-------------------------------------------------------------------------------------------
------------------------ADDING LOCATION DYNAMICALLY TO TABLE---------------------------------
-------------------------------------------------------------------------------------------*/

function displayLocation() {
    $.ajax({
        url: 'data/getLocation.php',
        method: 'GET',
        success: function(result) {

            var d = result['data']

            $('#location-table').html(
                `<table class="table">
                    <thead class="table-dark sticky-top">
                        <tr>
                            <th scope="col" hidden>Id</th>
                            <th scope="col">Location</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="location-data">
                    </tbody>
                </table>`
            );

            for (var i = 0; i < d.length; i++) {
                $('#location-data').append(
                    `<tr>
                        <td scope="row" hidden>${d[i]['id']}</td>
                        <td>${d[i]['name']}</td>
                        <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#locationModal" data-id="${d[i]['id']}"><i class="fa-solid fa-pen-to-square"></i></button></td>
                        <td><button type="button" data-bs-toggle="modal" data-bs-target="#deleteLocationModal" data-id="${d[i]['id']}" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>`
            )
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
}

/*-------------------------------------------------------------------------------------------
-----------------------------------ADD EMPLOYEE BUTTON---------------------------------------
-------------------------------------------------------------------------------------------*/

// Executes when the add employee form button with type="submit" is clicked

$('#addEmployee').on('submit', function() {
    $.ajax({
        url: 'data/addEmployee.php',
        method: 'POST',
        data: {
            firstName: $('#addFirstName').val(),
            lastName: $('#addLastName').val(),
            jobTitle: $('#addJobTitle').val(),
            email: $('#addEmail').val(),
            department: $('#addDepartment').val(),
        },
        success: function(result) {

            $('#newEmployeeModal').modal('hide');
            displayEmployees();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

//Focuses on first name for user convenience

$('#newEmployeeModal').on('shown.bs.modal', function() {
    $('#addFirstName').focus();
})

/*-------------------------------------------------------------------------------------------
---------------------------------DELETE EMPLOYEE BUTTON--------------------------------------
-------------------------------------------------------------------------------------------*/

$('#deletePersonnelModal').on('show.bs.modal', function(id) {
    $('#hiddenDeletePersonnel').val($(id.relatedTarget).attr('data-id'))
})

$('#deletePersonnel').on('submit', function(id) {
    id.preventDefault();
    console.log($('#hiddenDeletePersonnel').val())
    $.ajax({
        url: 'data/removePersonnel.php',
        method: 'POST',
        data: {
            deleteEmployee: $('#hiddenDeletePersonnel').val() // Retrieves the data-id attribute from the calling button
        },
        success: function(result) {

            $('#deletePersonnelModal').modal('hide');
            displayEmployees();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

/*-------------------------------------------------------------------------------------------
---------------------------------DELETE DEPARTMENT BUTTON------------------------------------
-------------------------------------------------------------------------------------------*/

$('#deleteDepartmentModal').on('show.bs.modal', function(id) {
    $('#hiddenDeleteDepartment').val($(id.relatedTarget).attr('data-id'))
})

$('#deleteDepartment').on('submit', function(id) {
    id.preventDefault();
    $.ajax({
        url: 'data/removeDepartment.php',
        method: 'POST',
        data: {
            deleteDepartment: $('#hiddenDeleteDepartment').val() // Retrieves the data-id attribute from the calling button
        },
        success: function(result) {

            $('#deleteDepartmentModal').modal('hide');
            displayDepartment();
            displayEmployees();
            displayLocation();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

/*-------------------------------------------------------------------------------------------
---------------------------------DELETE LOCATION BUTTON--------------------------------------
-------------------------------------------------------------------------------------------*/

$('#deleteLocationModal').on('show.bs.modal', function(id) {
    $('#hiddenDeleteLocation').val($(id.relatedTarget).attr('data-id'))
})

$('#deleteLocation').on('submit', function(id) {
    id.preventDefault();
    $.ajax({
        url: 'data/removeLocation.php',
        method: 'POST',
        data: {
            deleteLocation: $('#hiddenDeleteLocation').val() // Retrieves the data-id attribute from the calling button
        },
        success: function(result) {

            $('#deleteLocationModal').modal('hide');
            displayLocation();
            displayDepartment();
            displayEmployees();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

/*-------------------------------------------------------------------------------------------
---------------------------------EDIT EMPLOYEE BUTTON----------------------------------------
-------------------------------------------------------------------------------------------*/

//Executes before the modal is visible

$('#editModal').on('show.bs.modal', function(id) {
    $('#hiddenData').val($(id.relatedTarget).attr('data-id'))
    $.ajax({
        url: 'data/getPersonnelById.php',
        method: 'POST',
        dataType: 'json',
        data: {
            updateId: $(id.relatedTarget).attr('data-id') // Retrieves the data-id attribute from the calling button
        },
        success: function(result) {
            $('#firstName').val(result['data'][0]['firstName']);
            $('#lastName').val(result['data'][0]['lastName']);
            $('#jobTitle').val(result['data'][0]['jobTitle'])
            $('#email').val(result['data'][0]['email']);
            $('#department').val(result['data'][0]['departmentID']);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

// Executes when the employee form button with type="submit" is clicked

$('#employeeForm').on("submit", function(e) {
    e.preventDefault();
    console.log($('#department').val())
    console.log($('#hiddenData').val())
    $.ajax({
        url: 'data/updatePersonnel.php',
        method: 'POST',
        dataType: 'json',
        data: {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            jobTitle: $('#jobTitle').val(),
            email: $('#email').val(),
            department: $('#department').val(),
            hiddenData: $('#hiddenData').val()
        },
        success: function(result) {

            $('#editModal').modal('hide');
            displayEmployees();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

// Places the cursor on the first input as a courtesy to the user

$('#editModal').on('shown.bs.modal', function() {
    $('#firstName').focus();
})

/*-------------------------------------------------------------------------------------------
---------------------------------EDIT DEPARTMENT BUTTON--------------------------------------
-------------------------------------------------------------------------------------------*/

//Executes before the modal is visible

$('#departmentModal').on('show.bs.modal', function(id) {
    $('#hiddenDepartmentData').val($(id.relatedTarget).attr('data-id'))
    $.ajax({
        url: 'data/getDepartmentById.php',
        method: 'POST',
        dataType: 'json',
        data: {
            updateDepartment: $(id.relatedTarget).attr('data-id') // Retrieves the data-id attribute from the calling button
        },
        success: function(result) {
            $('#departmentName').val(result['data'][0]['name']);
            $('#locationID').val(result['data'][0]['locationID']);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

// Executes when the department form button with type="submit" is clicked

$('#departmentForm').on("submit", function(e) {
    e.preventDefault();
    console.log($('#hiddenDepartmentData').val())
    $.ajax({
        url: 'data/updateDepartment.php',
        method: 'POST',
        data: {
            departmentName: $('#departmentName').val(),
            locationID: $('#locationID').val(),
            hiddenData: $('#hiddenDepartmentData').val()
        },
        success: function(result) {

            $('#departmentModal').modal('hide');
            displayDepartment();
            displayEmployees();
            displayLocation();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

/*-------------------------------------------------------------------------------------------
---------------------------------EDIT LOCATION BUTTON----------------------------------------
-------------------------------------------------------------------------------------------*/

//Executes before modal is visible

$('#locationModal').on('show.bs.modal', function(id) {
    $('#hiddenLocationData').val($(id.relatedTarget).attr('data-id'))
    $.ajax({
        url: 'data/getLocationById.php',
        method: 'POST',
        dataType: 'json',
        data: {
            updateLocation: $(id.relatedTarget).attr('data-id') // Retrieves the data-id attribute from the calling button
        },
        success: function(result) {
            $('#locationName').val(result['data'][0]['name']);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})

// Executes when the department form button with type="submit" is clicked

$('#locationForm').on("submit", function(e) {
    e.preventDefault();
    $.ajax({
        url: 'data/updateLocation.php',
        method: 'POST',
        data: {
            locationName: $('#locationName').val(),
            hiddenData: $('#hiddenLocationData').val()
        },
        success: function(result) {

            $('#locationModal').modal('hide');
            displayLocation();
            displayDepartment();
            displayEmployees();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR)
        }
    })
})






