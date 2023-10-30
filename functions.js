var buildingID = 0; // Set default value if not found

function saveVariable(num) {
    // Update the variable's value and store it in localStorage
    buildingID = num; // Change this to your updated value
    localStorage.setItem("buildingID", buildingID);
}
function nextPage() {
    if (document.getElementById("Choices").value == "Edit") {
        window.location.href = "edit.html";
        return;
    }
    else if (document.getElementById("Choices").value == "Add") {
        window.location.href = "Add.html";
        return;
    }
    else if (document.getElementById("Choices").value == "Delete") {
        window.location.href = "Delete.html";
        return;
    }
}

function buildingSelector() {
    if (document.getElementById("building").value == "Freida") {
        console.log("FREIDA");
        saveVariable(1);
    }
    else if (document.getElementById("building").value == "Hilly") {
        console.log("HILLY");
        saveVariable(2);
    }
    else if(document.getElementById("building").value == "Tark") {
        console.log("TARK");
        saveVariable(3);
    }
}


function userIDCheck() {
    var xhr = new XMLHttpRequest();
    console.log(document.getElementById("userID").value);
    var userID = document.getElementById("userID").value;
    var url = 'https://us-central1-cs348project1-403521.cloudfunctions.net/UserIDCheck?userID=' + document.getElementById("userID").value;
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
        // Handle successful response
        var arr = xhr.responseText.split(",");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(/[^\w\s]/gi, '')
            arr[i] = arr[i].replace(/\s/g, '')
        }
        if (arr[0] == String(userID)) {
            if (arr[4] === 'null') {
                window.location.href = "add3.html";
            }
            else if (arr[4] != 'null'){
                alert("User ID already has a room! Please select another ID")
            }
        } else {
            alert("User ID does not exist");
        }
        } else {
        // Handle error
        console.error('Request failed with status:', xhr.status);
        }
    }
    };
    xhr.send();
}


function addRows() {
    var xhr = new XMLHttpRequest();
    buildingID = localStorage.getItem("buildingID");
    var url = 'https://us-central1-cs348project1-403521.cloudfunctions.net/getAllRooms?bID=' + buildingID;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
        // Handle successful response
        var arr = xhr.responseText.split(",");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(/[^\w\s]/gi, '')
            arr[i] = arr[i].replace(/\s/g, '')
        }
        console.log(arr);
        } else {
        // Handle error
        console.error('Request failed with status:', xhr.status);
        }
    }
    };
    
    xhr.send();
    var table = document.getElementById("myTable");
    var row = table.insertRow(table.rows.length - 1); // Insert before the last row (excluding the header row)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = 'New Data 1';
    cell2.innerHTML = 'New Data 2';
    cell3.innerHTML =  'New Data 3';
    cell4.innerHTML =  'New Data 4';
}