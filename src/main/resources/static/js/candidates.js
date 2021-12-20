let parties;
let partyMap = new Map;
let candidates;

function fetchParties() {
    const url = "http://localhost:8080/api/get-all-parties";
    fetch(url).then(response => response.json()).then(data => {parties = data; createPartyMap(); createPartyDropdownAdd()});
    fetchCandidates();
}

function fetchCandidates(sortByParty) {
    const url = sortByParty ? "http://localhost:8080/api/get-all-candidates-sort-by-party" : "http://localhost:8080/api/get-all-candidates";

    fetch(url).then(response => response.json()).then(data => {candidates = data; createCandidateList()});
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

        let deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("Slet"));
        deleteButton.setAttribute("id", "delete-" + candidate.id);
        deleteButton.addEventListener("click", deleteCandidate);


        //hide fields
        let hideContainer = document.createElement("div");
        hideContainer.style.display = "none";

        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");



        //append
        document.getElementById("candidates-container").appendChild(fieldsContainer);
        fieldsContainer.appendChild(span);
        fieldsContainer.appendChild(editButton);
        fieldsContainer.appendChild(deleteButton);

    }
}

function deleteCandidate(event) {
    console.log(event.target.id);
    const id = event.target.id.substring(event.target.id.lastIndexOf("-") + 1);
    const url = "http://localhost:8080/api/delete-candidate/" + id;

    let deleteRequest = {
        method: "DELETE",
    }

    fetch(url, deleteRequest).then(response => console.log(response.ok));


    //todo: refresh
}

function openEdit(event) {

}

function createPartyMap() {
    for (let party of parties) {
        partyMap.set("" + party.partyId, party);
    }
}

function createPartyDropdownAdd() {
    const dropdown = document.getElementById("party-input-add");
    for (let party of parties) {
        let partyOption = document.createElement("option");
        partyOption.value = party.partyId;
        partyOption.text = party.name;
        dropdown.appendChild(partyOption);
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