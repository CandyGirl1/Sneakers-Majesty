// All javascript functions are located in this one file
// Please note that you can use multiple .js files in your own projects
// as long as you link them in your header.

// We use AJAX to do all of our API calls to link through our API and DB
// Cards are rendered dynamically for each of our tuples in or db table
// and we render modals dynamically to display our update and create forms.

// The initialize function is linked to our html body, using the onload attribute.
// This means that when the HTML body is loaded, the .initialize() function activates.
function initialize() {
    // This render Modal call create our button and modal for creating a student at page onload.
    renderModal("createSneaker", "modals");
    // Our get students function also does our rendering of all our cards, by calling the renderStudent() function.
   getSneakers("/api/sneakers");
}

// AJAX call and rendering using rederStudent() inside
function getSneakers(url) {

    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            renderSneaker(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Sneaker List stored");

}

// We need this single student AJAX call to get API data when we update the student
function getOneSneaker(id) {
    var url = "/api/sneaker/" + id;
    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();
    var sneaker;

    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem("sneaker", this.responseText);
        }
    };
    xhttpList.open("GET", url, false);
    xhttpList.send();
    console.log("Single sneaker retrieved");

    return sessionStorage.getItem("sneaker");
}

// We need this single student AJAX call to get API data when we update the student
function getSneakersBrand() {

    var brand = document.getElementById("BrandName").value;

    var url = "/api/sneakers/brands/" + brand;
    //make initial api call to get Student list
    var xhttpList = new XMLHttpRequest();

    var sneaker;


    // Read JSON - and put in storage
    xhttpList.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
           sessionStorage.setItem("sneaker", this.responseText);
          
           renderSneaker(this.responseText);
            
            var display = document.getElementById("sneakers");
            display.innerHTML = '';
           getSneakers(url);
        }
    };
    //console.log(brand);

    xhttpList.open("GET", url, false);
    xhttpList.send();
    console.log("Single sneaker brand retrieved");

    return sessionStorage.getItem("sneaker");
}

// This function renders all the students as we receive from our AJAX call
function renderSneaker(data) {
    var json = JSON.parse(data);

    // Ajax returns an array of JSON objects - the index represents each individual JSON object from our AJAX call
    // We can the iterate over all of our students
    for (var index = 0; index < json.length; index++) {
        // We wrtie our HTML in a string and use the insertAdjacentHTML(placement, string) where we pass the string to be rendered on our page
        var cardHtml = '  <div class="card bg-primary"  style="width:400px" id="' + json[index].id + '">'
            + '<div class ="card-header"><h3>' + json[index].shoeName + ' </h3>'
            + '<img class="card-img-top" src=' + json[index].url + ' alt="Card image" style="width:100%">'
            + '<div class="card-body">'
            + '<h4 class="card-title">' +'Brand: '+ json[index].brand + '</h4>'
            + '<p class="card-text">' +'Color: '+ json[index].colorway + ' </p>'
            + '<p class="card-text">' +'Size: '+ json[index].size + ' </p>'
            + '<p class="card-text">' +' Price: $'+ json[index].price + " "+'<button type="button" class="btn btn-success" onclick="AddtoCart()" shoe-name="'+json[index].shoeName +'"shoe-price='+json[index].price+' > Buy </button></p>'
            + '<div class="card-footer btn-group" id="update' + json[index].id + '">'
            + '<button class="btn btn-danger" onclick="deleteSneaker(' + json[index].id + ')">DELETE</button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        console.log("Sneaker Card with ID: " + json[index].id + " created");

       

        // We create a card deck that will dictate our groupings of cards
        var cardDeck;
        if (index % 4 == 0) {
            cardDeck = document.createElement("div");
            cardDeck.classList.add("card-deck");
            cardDeck.id = "deck" + index;
            document.getElementById("sneakers").appendChild(cardDeck);
            cardDeck = document.getElementById("deck" + index);
        }

        cardDeck.insertAdjacentHTML('beforeend', cardHtml);
        // Once the student cards are created and rendered on our page, we can then find them and add on the update buttons with associated modals
        renderModal("updateSneaker", json[index].id);
    }

}


// This function renders the buttons and modals for our Create and Update students, and calls the renderForm() function that conatains the form data in
// a string version of HTML to be rendered.
function renderModal(modalPurpose, id) {

    var location;
    var color;
    var btntxt;
    var sneaker;
    var sneakerID = '';

    // Switch allows us to choose our format based on Create or Update
    switch (modalPurpose) {
        case "createSneaker":
            location = id;
            color = "btn-success";
            btntxt = "Create a Sneaker";
            break;
        case "updateSneaker":
            sneaker = getOneSneaker(id);
            sneakerID = JSON.parse(sneaker).id;
            location = "update" + id;
            color = "btn-warning";
            btntxt = "Update";
            break;
    }

    // Button creation and placement - based on the Switch case above
    var buttonHtml = '<button type="button" class="btn ' + color + '" data-toggle="modal" data-target="#' + modalPurpose + sneakerID + '">' + btntxt + '</button>';
    document.getElementById(location).insertAdjacentHTML('beforeend', buttonHtml);


    // String that contains the HTML to render our modals
    // Note that Modals pair to buttons through the modal's id, and the button's data-target attributes. 
    var modalHtml = ' <div class="modal fade" id="' + modalPurpose + sneakerID + '"> '
        + ' <div class="modal-dialog modal-xl"> '
        + ' <div class="modal-content"> '

        + '<div class="modal-header">'
        + '<h4 class="modal-title">Sneaker Form</h4>'
        + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
        + '</div>'

        + '<div class="modal-body">'
        + sneakerForm(sneaker, modalPurpose)
        + '</div>'

        + '<div class="modal-footer">'
        + '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
        + '</div>'

        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';

    // Write the modal in the appropriate place.  All modals can be written to the same place on the page, as this does not affect display our function.
    document.getElementById("modals").insertAdjacentHTML('beforeend', modalHtml);

}

// AJAX create student
// Ensure you have the correct verb, URI, and headers set.  SendData is a JSON object that conatains our information from the create form
function createSneaker() {

    // We need the JSON that will be in our POST body.  We retrieve the data from the form and store in the values.
    var sendData = {
        "url": document.getElementById("createSneakerurl").value,
        "shoeName": document.getElementById("createSneakershoeName").value,
        "brand": document.getElementById("createSneakerbrand").value,
        "colorway": document.getElementById("createSneakercolorway").value,
        "price": document.getElementById("createSneakerprice").value,
        "size": document.getElementById("createSneakersize").value
    }
    console.log(sendData);

    // Confirmation about creating
    var ok = confirm("Ready to send?");

    if (ok == true) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/api/add/sneaker", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Update success");
                // We need to refresh the display to show our new student, so we clear the div with our current cards on 
                // display.  Then we call the function getStudents() to reload our cards.
                var display = document.getElementById("sneakers");
                display.innerHTML = '';
                getSneakers("/api/sneakers");
                console.log("Sneaker created!");
            }
        };
        // When we send our JSON student, we need to covert it to String using JSON.stringify.  The header is what let's our recipient know that it should
        // be read as JSON
        xhttp.send(JSON.stringify(sendData));
    }

}

// When we delete, we need the ID to grab that student and delete
function deleteSneaker(id) {
    // We append the URL to have the id based on what is passed, for our API
    var link = "/api/delete/sneaker/" + id;
    console.log("Loaded into delete function");

    var ok = confirm("Are you sure you want to delete?\nPress 'OK' to confirm, or 'cancel' to cancel");
    if (ok == true) {

        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", link, true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // The deletion from the database happens when this call is sent, however we also need to remove
                // from the page.  We do that by grabbing the card by id (which is the same as the student id) and then navigate to its parent node.
                // We can then from the parent node, call the removeChild() and say which card to remove.
                var removeCard = document.getElementById(id);

                removeCard.parentNode.removeChild(removeCard);
                console.log("Sneaker deleted.");
            }
        };
        // No data to be sent in body
        xhttp.send(null);
    }
}

// In this AJAX update, we get all the data for one student as well.  This way we don't have to use PATCH verb
// When we get the single student data, we can use it to prefill the form with old data of that student.
// If you try to update and leave things blank, it will override your old data to the blanks.
function updateSneaker(id) {

    // Just like in Create, we need to populate the JSON student that we will put in our AJAX body to submit to our API
    // We need the id this time, since we need to know which student we are updating.
    var sendData = {
        "id": id,
        "url": document.getElementById("updateSneakerurl" + id).value,
        "shoeName": document.getElementById("updateSneakershoeName" + id).value,
        "brand": document.getElementById("updateSneakerbrand" + id).value,
        "colorway": document.getElementById("updateSneakercolorway" + id).value,
        "price": document.getElementById("updateSneakerprice" + id).value,
        "size": document.getElementById("updateSneakersize" + id).value
    }
    console.log(sendData);

    var ok = confirm("Please confirm you wish to apply these changes");

    // Just like create, we set our headers to show our data is JSON
    if (ok == true) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/api/update/sneaker", true);
        xhttp.setRequestHeader('content-Type', 'application/json');
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Update success");
                var display = document.getElementById("sneakers");
                display.innerHTML = '';
                getSneakers("/api/sneakers");
            }
        };
        // Be sure that the JSON student is coverted to String before sending, using JSON.stringify
        xhttp.send(JSON.stringify(sendData));
    }
}

// This function will return a form, based on creating or updating.  It returns a string of HTML which we pass to our modal to be rendered.
function sneakerForm(student, purpose) {
    // Initialize our variables that will put injected in the form.
    var input;
    var id;
    var url;
    var shoeName;
    var brand;
    var colorway;
    var price;
    var size;
     var action;

    // Switch statement assigns variables based on create or update.  If update is selected, our variables are read from the single student JSON,
    // using the getOneStudent(id) method
    switch (purpose) {
        case "createSneaker":
            input = '';
            id ='';
            url = '';
            shoeName = '';
            brand = '';
            colorway = '';
            price = '';
            size = '';
            action = 'createSneaker()';
            break;
        case "updateSneaker":
            input = JSON.parse(student);
            id = input.id;
            url= input.url;
            shoeName = input.shoeName;
            brand = input.brand;
            colorway = input.colorway;
            price = input.price;
            size = input.size;
            action = 'updateSneaker(' + input.id + ')';
            break;
    }

    // The actual HTML that will be returned (called later by the modal) stored in String form
    // The variables are set based on create or update.  The value attributes of the input elements are key to filling in the form with the existing
    // student data
    var form = ''
        + '<form>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text">Image URL</span>'
        + '</div>'
        + '<input type="text" class="form-control" placeholder="Enter Image" autocomplete="on" id="' + purpose + 'url' + id +'" value="' + url + '">'
        + '</div>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text">Shoe Name</span>'
        + '</div>'
        + '<input type="text" class="form-control" placeholder="Enter Shoe Name" id="' + purpose + 'shoeName' + id +'" value="' + shoeName + '">'
        + '</div>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text">Brand</span>'
        + '</div>'
        + '<input type="text" class="form-control" placeholder="Enter Brand Name" id="' + purpose + 'brand' + id +'" value="' + brand + '">'
        + '</div>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text">Colorway</span>'
        + '</div>'
        + '<input type="text" class="form-control" placeholder="Enter Colors"  id="' + purpose + 'colorway' + id +'" value="' + colorway + '">'
        + '</div>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text">Price</span>'
        + '</div>'
        + '<input type="number" class="form-control" placeholder="Enter Price" id="' + purpose + 'price' + id +'" value="' + price + '">'
        + '</div>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text">Size</span>'
        + '</div>'
        + '<input type="number" class="form-control" placeholder="Enter Size" id="' + purpose + 'size' + id +'" value="' + size + '">'
        + '</div>'
        + '<button type="submit" class="btn btn-success" width="100%" data-dismiss="modal" onclick="' + action + '">Submit</button>'
        + '</form>';

        // The HTML of the form above is a string, and can be called by other functions to be rendered where appropriate.
    return form;
}
function createCustomers(){
  
    var modalHtml = ' <div class="modal fade" id="myModal role=dialog> '
    + ' <div class="modal-dialog modal-xl"> '
    + ' <div class="modal-content"> '

    + '<div class="modal-header">'
    + '<h4 class="modal-title">Customer Form</h4>'
    + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
    + '</div>'

    + '<div class="modal-body">'
    

    + '<div class="modal-footer">'
    + '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    + '</div>'

    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';
    document.getElementById("modals").insertAdjacentHTML('beforeend', "CustomerModal");
    return modalHtml;
}