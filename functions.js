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