
var totalCost=0;
let cartShoe = 0;
function AddtoCart() {
    var x = document.getElementById("cart");
    if (x.style.display === "none") {
        x.style.display = "block";
    }

    console.log(event.target);
  
    let name = event.target.getAttribute("shoe-name");
    console.log(name);
    let price = event.target.getAttribute("shoe-price");
   console.log(price);
    let shoe= {
        Name: name,
        price: price
    }
    console.log(shoe);
    totalCost += parseInt(price);
    createList(shoe);
};

function createList(shoe) {
    cartShoe++; 
    let root = document.getElementById("CustomerCart")

    // Shopping List  
    let li = document.createElement("p");
    li.setAttribute("class", "shoeList");
    li.setAttribute("id", "cartShoe" + cartShoe)
    li.textContent = `${shoe.Name} $${shoe.price}`
    root.appendChild(li);

    // remove Shoe Button 
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "removeButton");
    button.setAttribute("id", "cartShoe" + cartShoe);
    button.setAttribute("data-name", shoe.Name);
    button.setAttribute("data-price", shoe.price);
    button.setAttribute("onclick", "removeShoe()");
    button.textContent = "X";
    li.appendChild(button);

    // Total Cost
    let x = document.getElementById("totalCost");
    li.setAttribute("class", "totalCost")
    x.textContent = "Total Cost: $" + totalCost;
}

function removeShoe () {
    console.log(event.target);

    // Remove Price
    removePrice = event.target.getAttribute("data-price");
    let x = document.getElementById("totalCost");
    totalCost = totalCost-removePrice;
    x.textContent = "Total Cost: $" + totalCost;

    // Remove Button and Shoe
    let elementID = event.target.getAttribute("id")
    let element = document.getElementById(elementID);
    element.parentNode.removeChild(element);
}