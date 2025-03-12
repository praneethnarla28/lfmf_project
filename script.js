function findMarkets() {
    // Get the selected city and product type
    var city = document.getElementById("location").value;
    var productType = document.getElementById("productType").value;

    // Check if city and productType are not empty
    if (city === "" || productType === "") {
        alert("Please select a city and product type");
        return;
    }

    console.log("City:", city);
    console.log("Product Type:", productType);

    // Make an AJAX request to the PHP script to retrieve the markets
    var xhr = new XMLHttpRequest();
    var url = "get_markets.php?city=" + encodeURIComponent(city) + "&productType=" + encodeURIComponent(productType);
    console.log("URL:", url);

    xhr.open("GET", url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log("Response:", xhr.responseText);
            try {
                var markets = JSON.parse(xhr.responseText);
                displayMarkets(markets);
            } catch (e) {
                console.error("Error parsing JSON:", e);
            }
        } else {
            console.error("Request failed. Status:", xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error("Request error");
    };
    xhr.send();
}

function displayMarkets(markets) {
    // Code to display the markets goes here
    console.log("Markets:", markets);
    // Example: Display markets in a list
    var marketList = document.getElementById("marketList");
    marketList.innerHTML = ""; // Clear previous results

    if (markets.length > 0) {
        markets.forEach(function(market) {
            var listItem = document.createElement("li");
            listItem.textContent = market.name + " - " + market.address + " - " + market.phone;
            marketList.appendChild(listItem);
        });
    } else {
        marketList.textContent = "No markets found.";
    }
}