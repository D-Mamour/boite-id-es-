const form = document.getElementById("ideaForm");
const ideasContainer = document.getElementById("ideasContainer");

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

displayIdeas();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  const idea = {
    id: Date.now(),
    title,
    category,
    description,
  };

  ideas.push(idea);

  saveIdeas();

  form.reset();

  displayIdeas();
});

function saveIdeas() {
  localStorage.setItem("ideas", JSON.stringify(ideas));
}

function displayIdeas() {
  ideasContainer.innerHTML = "";

  ideas.forEach((idea) => {
    let categoryClass = "";

    if (idea.category === "Pédagogie") {
      categoryClass = "pedagogie";
    }

    if (idea.category === "Événement") {
      categoryClass = "evenement";
    }

    if (idea.category === "Vie de campus") {
      categoryClass = "campus";
    }

    if (idea.category === "Amélioration technique") {
      categoryClass = "technique";
    }

    const card = document.createElement("div");

    card.classList.add("idea-card");

    card.innerHTML = `
            <span class="badge ${categoryClass}">
                ${idea.category}
            </span>

            <h3>${idea.title}</h3>

            <p>${idea.description}</p>

            <div class="actions">
                <button
                    class="edit-btn"
                    onclick="editIdea(${idea.id})"
                >
                    Éditer
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteIdea(${idea.id})"
                >
                    Supprimer
                </button>
            </div>
        `;

    ideasContainer.appendChild(card);
  });
}

function deleteIdea(id) {
  const confirmation = confirm("Voulez-vous supprimer cette idée ?");

  if (!confirmation) {
    return;
  }

  ideas = ideas.filter((idea) => idea.id !== id);

  saveIdeas();

  displayIdeas();
}

function editIdea(id) {
  const idea = ideas.find((idea) => idea.id === id);

  const newTitle = prompt("Modifier le titre", idea.title);

  const newDescription = prompt("Modifier la description", idea.description);

  if (newTitle !== null && newDescription !== null) {
    idea.title = newTitle;
    idea.description = newDescription;

    saveIdeas();

    displayIdeas();
  }
}
