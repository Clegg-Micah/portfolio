// ECMASCRIPT FILE for ACME Page

//ACME JavaScript Functions
const TITLE = document.getElementById("title");
const HOME = document.getElementById("home");
const PRODUCT = document.getElementById("content-page");
const NAV = document.getElementById("page-nav");
const JSON = "/acme/js/acme.json";

//event listeners
NAV.addEventListener("click", function (event) {
    let nav = event.target.innerHTML;
    event.preventDefault();

    console.log("**NAV CLICKED**");
    console.log(nav);
    TITLE.innerHTML = ("ACME | Home");
    if(nav != "Home") {
        HOME.setAttribute("class", "hide");
        getData(nav);
    } else {
        PRODUCT.setAttribute("class", "hide");
        HOME.setAttribute("class", "show");
    }

});

//Build Nav Bar
getNav();


function getNav() {
    fetch(JSON)
        .then(response => response.json())
        .then(function (data) {
        data = data.Nav;
        console.log(data);
        let list = "<ul>";
        for (let i = 0, n = data.length; i < n; i++) {
            list += "<li><a id='" + data[i] + "' title='Navigate to "  + data[i] + "' target='_blank'>" + data[i] + "</a></li>";
            console.log(data[i]);
        };
        list += "</ul>";

        // Inject list into the searchResults section of the web page
        NAV.innerHTML = list;
    })
}

function getData(target){
    console.log("target is: " + target)
    fetch(JSON)
        .then(response => response.json())
        .then(function (data){

        console.log("This is the Json Object in the getData function");
        console.log(data);
        console.log("This is JSON's target" + data[target])
//        Catch garbage and place placeholder title
        if(target == "undefined" || target.includes("<ul>")) {
            TITLE.innerHTML = ("ACME | Buy Here. Eat Roadrunner");

        } else{
            TITLE.innerHTML = ("ACME | " + target);
        }
        data = data[target];
        console.log("Inside of data target");
        console.log(data);

        //check what it thinks is the target data (object)
        //set Title to target name

        //enter name into name spot
        document.getElementById("product-name").innerHTML = data.name;
        //enter product description into product description spot of webpage
        document.getElementById("product-description").innerHTML = data.description;

        //enter image into image spot
        document.getElementById("product-image").setAttribute("src", data.path);
        document.getElementById("product-image").setAttribute("alt", "Image of the " + data.manufacturer + " " + data.name);


        //enter made by into made by spot
        document.getElementById("product-manufacturer").innerHTML = "<b>Made by: </b>" + data.manufacturer;

        //enter stars product recieved
        document.getElementById("product-review").innerHTML = "<b>Reviews: </b>" + data.reviews;

        //enter specific price
        document.getElementById("product-price").innerHTML = "Price: $" + data.price;
        //hide or show correct container
        PRODUCT.setAttribute("class", "show");
    })
        .catch(error => console.log('Error:', error))
}
