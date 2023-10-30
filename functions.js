var buildingID = 0;

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
        buildingID = 1;
    }
    else if (document.getElementById("building").value == "Hilly") {
        buildingID = 2;
    }
    else if(document.getElementById("building").value == "Tark") {
        buildingID = 3;
    }
}

function userIDCheck(userID) {
    const Http = new XMLHttpRequest();
    const url='https://us-central1-cs348project1-403521.cloudfunctions.net/UserIDCheck';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
    }
}