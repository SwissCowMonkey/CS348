var buildingID = 0; // Set default value if not found
var roomArray = [];
var globalUserID
function saveVariable(num) {
    // Update the variable's value and store it in localStorage
    buildingID = num; // Change this to your updated value
    localStorage.setItem("buildingID", buildingID);
}

function saveArray(arr) {
    roomArray = arr; // Change this to your updated value
    localStorage.setItem("roomArray", roomArray);
}

function saveUserID(num) {
    globalUserID = num
    localStorage.setItem("globalUserID", globalUserID);
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
    saveUserID(userID);
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

function userDeleteIDCheck() {
    var xhr = new XMLHttpRequest();
    userID = document.getElementById("userInput").value
    saveUserID(userID);
    var url = 'https://us-central1-cs348project1-403521.cloudfunctions.net/UserIDCheck?userID=' + document.getElementById("userInput").value;
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
                alert("User ID doesn't have a room. Please select another ID")
            }
            else if (arr[4] != 'null'){
                window.location.href = "delete2.html";
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
        var tempArr = []
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(/[^\w\s]/gi, '')
            arr[i] = arr[i].replace(/\s/g, '')
        }
        for (var i = 0; (4*i) < arr.length; i++) {
            var table = document.getElementById("myTable");
            var row = table.insertRow(table.rows.length - 1); // Insert before the last row (excluding the header row)
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = arr[4*i];
            cell2.innerHTML = arr[(4*i)+1];
            cell3.innerHTML = arr[(4*i)+2];
            cell4.innerHTML = arr[(4*i)+3];
            tempArr[i] = arr[4*i];
        }
        saveArray(tempArr);
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

    cell1.innerHTML = 'Room Number';
    cell2.innerHTML = 'BuildingID';
    cell3.innerHTML =  'Years Occupied';
    cell4.innerHTML =  'Yearly Cost';
}

function deleteRoom() {
    var xhr = new XMLHttpRequest();
    userID = localStorage.getItem("globalUserID");
    var url = 'https://us-central1-cs348project1-403521.cloudfunctions.net/deleteRoom?userID=' + userID;
    console.log(url)
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
        // Handle successful response
        } else {
        // Handle error
        console.error('Request failed with status:', xhr.status);
        }
    }
    };
    alert("Room deleted from user ID");
    xhr.send();
}


function editIDCheck() {
    var xhr = new XMLHttpRequest();
    console.log(document.getElementById("userInput").value);
    var userID = document.getElementById("userInput").value;
    saveUserID(userID);
    var url = 'https://us-central1-cs348project1-403521.cloudfunctions.net/UserIDCheck?userID=' + userID;
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
            if (arr[4] != 'null') {
                window.location.href = "edit2.html";
            }
            else {
                alert("User ID doesn't have a room. Please select another ID")
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

function addRoom() {
    var xhr = new XMLHttpRequest();
    roomsString = localStorage.getItem("roomArray");
    roomArray = roomsString.split(",");
    userRoom = document.getElementById("userRoom").value;
    userID = localStorage.getItem("globalUserID");
    console.log(userID)
    console.log(roomArray.includes(userRoom))
    if (roomArray.includes(userRoom)) {
        var url = 'https://us-central1-cs348project1-403521.cloudfunctions.net/addRoom1?userID=' + userID + "&roomID=" + userRoom;
        console.log(url)
        xhr.open('POST', url, true);
        xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
            // Handle successful response
            } else {
            // Handle error
            console.error('Request failed with status:', xhr.status);
            }
        }
    };
    alert("Room added to user ID");
    xhr.send();
    } else {
        alert("Room does not exist in the building");
        return;
    }
}

function getUserInfo() {
    var xhr = new XMLHttpRequest();
    var userID = localStorage.getItem("globalUserID");
    saveUserID(userID);
    var url = 'https://us-central1-cs348project1-403521.cloudfunctions.net/UserIDCheck?userID=' + userID;
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
        var table = document.getElementById("myTable");
        var row = table.insertRow(table.rows.length - 1); // Insert before the last row (excluding the header row)
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = 'User ID';
        cell2.innerHTML = 'First Name';
        cell3.innerHTML =  'Last Name';
        cell4.innerHTML =  'Current Room Number';
        var table = document.getElementById("myTable");
        var row = table.insertRow(table.rows.length - 1); // Insert before the last row (excluding the header row)
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = arr[0];
        cell2.innerHTML = arr[1];
        cell3.innerHTML = arr[2];
        cell4.innerHTML = arr[4];
        
        } else {
        // Handle error
        console.error('Request failed with status:', xhr.status);
        }
    }
    };
    xhr.send();
}