let parties;
let partyMap = new Map;
let candidates;
let candidateMap = new Map;

function fetchParties() {
    const url = "http://localhost:8080/api/get-all-parties";
    fetch(url).then(response => response.json()).then(data => {parties = data; createPartyMap();
    createPartyDropdown(document.getElementById("party-input-add")); fetchCandidates()});
}

function fetchCandidates() {
    const url = "http://localhost:8080/api/get-all-candidates";

    fetch(url).then(response => response.json()).then(data => {candidates = data; createSortDropdown(); createCandidateList(); createCandidateMap(); sortCandidatesBy("name")});
}

function sortCandidatesBy(sortParam) {
    if (sortParam === "name") {
        candidates.sort((a, b) => a.name.localeCompare(b.name));
    }

    else if (sortParam === "party") {
        candidates.sort((a, b) => a.politicalParty.name.localeCompare(b.politicalParty.name));
    }

    createCandidateList();
}

function createCandidateMap() {
    for (let candidate of candidates) {
        candidateMap.set(candidate.id, candidate);
    }
}

function createSortDropdown() {
    const label = document.createElement("label");
    label.setAttribute("for", "sort-dropdown");

    //create sort dropdown
    const sortDropdown = document.createElement("select");
    sortDropdown.setAttribute("id", "sort-dropdown");
    const sortOption1 = document.createElement("option");
    sortOption1.value = "party";
    sortOption1.text = "Parti";
    const sortOption2 = document.createElement("option");
    sortOption2.value = "name";
    sortOption2.text = "Navn"
    sortDropdown.appendChild(sortOption2);
    sortDropdown.appendChild(sortOption1);
    sortDropdown.setAttribute("onchange", "sortCandidatesBy(this.value)");
    document.getElementById("sort-dropdown-container").appendChild(label);
    document.getElementById("sort-dropdown-container").appendChild(sortDropdown);
}


function createCandidateList() {
    document.getElementById("candidates-container").innerHTML = "";

    const p = document.createElement("h3");
    p.appendChild(document.createTextNode("Kandidatliste for Samsø kommune"));
    document.getElementById("candidates-container").appendChild(p);


    for (let candidate of candidates) {
        //container for fields
        let fieldsContainer = document.createElement("div");

        //visible fields
        let span = document.createElement("span");
        span.innerText = candidate.name + " ";

        let span2 = document.createElement("span");
        span2.innerText = candidate.politicalParty.name;
        span2.style.color = "blue";

        let editButton = document.createElement("button");
        editButton.appendChild(document.createTextNode("Rediger"));
        editButton.setAttribute("id", "edit-" + candidate.id);
        editButton.addEventListener("click", openEdit);

        let deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("Slet"));
        deleteButton.setAttribute("id", "delete-" + candidate.id);
        deleteButton.addEventListener("click", deleteCandidate);


        //hide fields
        let hideContainer = document.createElement("div");
        hideContainer.style.display = "none";
        hideContainer.setAttribute("id", "hide-" + candidate.id);
        hideContainer.setAttribute("class", "hide-container");

        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        hideContainer.appendChild(nameInput);
        nameInput.setAttribute("id", "name-input-" + candidate.id);
        nameInput.value = candidate.name;

        let voteInput = document.createElement("input");
        voteInput.setAttribute("type", "number");
        hideContainer.appendChild(voteInput);
        voteInput.setAttribute("id", "votes-input-" + candidate.id);
        voteInput.value = candidate.numberOfVotes;

        let select = document.createElement("select");
        createPartyDropdown(select, candidate);
        hideContainer.appendChild(select);
        select.setAttribute("id", "party-input-" + candidate.id);



        let saveButton = document.createElement("button");
        saveButton.appendChild(document.createTextNode("Gem"));
        saveButton.addEventListener("click", openEdit);
        saveButton.setAttribute("id", "save-" + candidate.id);
        hideContainer.appendChild(saveButton);
        saveButton.addEventListener("click", saveCandidate);

        //append
        document.getElementById("candidates-container").appendChild(fieldsContainer);
        fieldsContainer.appendChild(span);
        fieldsContainer.appendChild(span2);
        fieldsContainer.appendChild(editButton);
        fieldsContainer.appendChild(deleteButton);
        fieldsContainer.appendChild(hideContainer);

    }
}

function hideAllEditFields() {
    const hideContainers = document.querySelectorAll(".hide-container");
    for (let hideContainer of hideContainers) {
        hideContainer.style.display = "none";
    }
}

function saveCandidate(event) {
    const id = event.target.id.substring(event.target.id.lastIndexOf("-") + 1);
    const url = "http://localhost:8080/api/edit-candidate";

    const selectedValue = document.getElementById("party-input-" + id).value;


    const candidate = {
        name : document.getElementById("name-input-" + id).value,
        numberOfVotes : document.getElementById("votes-input-" + id).value,
        politicalParty : partyMap.get("" + selectedValue),
        id : id
    }

    let postRequest = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(candidate)
    }

    fetch(url, postRequest).then(response => console.log("Success"));
}

function deleteCandidate(event) {
    const id = event.target.id.substring(event.target.id.lastIndexOf("-") + 1);
    const url = "http://localhost:8080/api/delete-candidate/" + id;

    let deleteRequest = {
        method: "DELETE",
    }

    fetch(url, deleteRequest).then(response => console.log(response.ok));



    let indexToRemove = -1;

    for (let i = 0; i < candidates.length; i++) {
        if (candidates[i].id === parseInt(id)) {
            indexToRemove = i;
            break;
        }
    }

    if (indexToRemove > -1) {
        candidates.splice(indexToRemove, 1);
        createCandidateList();
        createCandidateMap();
    }
}

function openEdit(event) {
    hideAllEditFields();
    const id = event.target.id.substring(event.target.id.lastIndexOf("-") + 1);
    document.getElementById("hide-" + id).style.display = "block";
}

function createPartyMap() {
    for (let party of parties) {
        partyMap.set("" + party.partyId, party);
    }
}

function createPartyDropdown(selectElement, candidate) {
    for (let party of parties) {
        let partyOption = document.createElement("option");
        partyOption.value = party.partyId;
        partyOption.text = party.name;
        if (arguments.length > 1 && candidate.politicalParty.partyId === party.partyId) {
            partyOption.setAttribute("selected", "selected");
        }
        selectElement.appendChild(partyOption);
    }
}


function postCandidate() {
    const url = "http://localhost:8080/api/create-candidate";

    const selectedValue = document.getElementById("party-input-add").value;


    const candidate = {
        name : document.getElementById("name-input-add").value,
        numberOfVotes : document.getElementById("votes-input-add").value,
        politicalParty : partyMap.get("" + selectedValue)
    }

    let postRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(candidate)
    }

    fetch(url, postRequest).then(() => window.location.href = "/candidates.html");


}