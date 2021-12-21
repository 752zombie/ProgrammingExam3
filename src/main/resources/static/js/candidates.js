let parties;
let partyMap = new Map;
let candidates;
let candidateMap = new Map;

function fetchParties() {
    const url = "http://localhost:8080/api/get-all-parties";
    fetch(url).then(response => response.json()).then(data => {parties = data; createPartyMap(); createPartyDropdown(document.getElementById("party-input-add"))});
    fetchCandidates();
}

function fetchCandidates() {
    const url = "http://localhost:8080/api/get-all-candidates";

    fetch(url).then(response => response.json()).then(data => {candidates = data; createCandidateList(); createCandidateMap(); sortCandidatesBy("name"); createSortDropdown()});
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
    //create sort dropdown
    const sortDropdown = document.createElement("select");
    const sortOption1 = document.createElement("option");
    sortOption1.value = "party";
    sortOption1.text = "Parti";
    const sortOption2 = document.createElement("option");
    sortOption2.value = "name";
    sortOption2.text = "Navn"
    sortDropdown.appendChild(sortOption2);
    sortDropdown.appendChild(sortOption1);
    sortDropdown.setAttribute("onchange", "sortCandidatesBy(this.value)");

    document.body.appendChild(sortDropdown);
}

function createCandidateList() {
    document.getElementById("candidates-container").innerHTML = "";


    for (let candidate of candidates) {
        //container for fields
        let fieldsContainer = document.createElement("div");

        //visible fields
        let span = document.createElement("span");
        span.innerText = candidate.name + " " + candidate.politicalParty.name;

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

        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        hideContainer.appendChild(nameInput);
        nameInput.setAttribute("id", "name-input-" + candidate.id);

        let voteInput = document.createElement("input");
        voteInput.setAttribute("type", "number");
        hideContainer.appendChild(voteInput);
        voteInput.setAttribute("id", "votes-input-" + candidate.id);

        let select = document.createElement("select");
        createPartyDropdown(select);
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
        fieldsContainer.appendChild(editButton);
        fieldsContainer.appendChild(deleteButton);
        fieldsContainer.appendChild(hideContainer);

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


    //todo: refresh
}

function openEdit(event) {
    const id = event.target.id.substring(event.target.id.lastIndexOf("-") + 1);
    document.getElementById("hide-" + id).style.display = "block";
}

function createPartyMap() {
    for (let party of parties) {
        partyMap.set("" + party.partyId, party);
    }
}

function createPartyDropdown(selectElement) {
    for (let party of parties) {
        let partyOption = document.createElement("option");
        partyOption.value = party.partyId;
        partyOption.text = party.name;
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

    fetch(url, postRequest).then(response => console.log("Success"));


}