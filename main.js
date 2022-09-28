"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee mb-5">';
    html += '<p class="d-none">' + coffee.id + '</p>';
    html += '<h1 \n class="d-inline pe-2 coffee-title">' + coffee.name + '</h1>';
    html += '<p class="d-inline coffee-sub text-muted fs-5">' + coffee.roast + '</p>';
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    // e.preventDefault(); // don't submit the form, we just want to update the data
    var x = document.getElementById("roast-selection").value;
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if(selectedRoast === 'all'){
            filteredCoffees.push(coffee)
        } else if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    coffeeList.innerHTML = renderCoffees(filteredCoffees);
}

function addCoffees(e){
    e.preventDefault();
    var submittedCoffee = {};
    var roast = document.getElementById("add-roast-selection").value;
    var name = document.getElementById("add-coffee-name").value;
    var newId = (coffees.length + 1);

    submittedCoffee.id = newId;
    submittedCoffee.name = name;
    submittedCoffee.roast = roast;
    coffees.push(submittedCoffee);
    updateCoffees(e);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// Storing selectors in variables.
var roastSelection = document.getElementById("roast-selection");
var coffeeList = document.querySelector('#coffees');
var coffeeSearch = document.getElementById("coffee-search");
var coffeeSubmit = document.getElementById("coffee-submit");
var addCoffeeSubmit = document.querySelector('#submit');
var addRoastSelection = document.querySelector('#add-roast-selection');


// Displays coffees in ascending order.
coffeeList.innerHTML = renderCoffees(coffees.reverse());


// Displays coffee that was searched for.
coffeeSubmit.addEventListener("click", function(e) {
    let coffeeResults = [];
    for (let i = 0; i < coffees.length; i++) {
        if (coffees[i].name.toLowerCase() === coffeeSearch.value || coffees[i].name.toUpperCase() === coffeeSearch.value) {
            coffeeResults.push(coffees[i]);
        } else {
            console.log("name doesn't match");
        }
    }
    // Replaces coffee list with user coffee search only.
    coffeeList.innerHTML = renderCoffees(coffeeResults);
});

// As user types in search box, coffee list will display coffees.
coffeeSearch.addEventListener("keyup", function(e) {
    let searchingCoffees = [];
    for (let i = 0; i < coffees.length; i++) {
        if (coffees[i].name.toLowerCase().includes(coffeeSearch.value) || coffees[i].name.toUpperCase().includes(coffeeSearch.value)) {
            searchingCoffees.push(coffees[i]);
        }
    }
    coffeeList.innerHTML = renderCoffees(searchingCoffees);
});


// Updates coffee list once user adds coffee.
addCoffeeSubmit.addEventListener("click", addCoffees);
