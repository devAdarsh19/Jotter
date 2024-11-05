const saveButton = document.querySelector('#btnSave');
const deleteButton = document.querySelector('#btnDelete');
const titleInput = document.querySelector('#title');
const descInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes__container');

function clearForm() {
    titleInput.value = '';
    descInput.value = ''
    deleteButton.classList.add('hidden');
}

function displayNoteInForm(note) {
    titleInput.value = note.title;
    descInput.value = note.description;
    deleteButton.classList.remove('hidden');
    deleteButton.setAttribute('data-id', note.id);
    saveButton.setAttribute('data-id', note.id);
}

function getNoteById(id) {
    fetch(`https://localhost:7242/api/notes/${id}`)
    .then(data => data.json())
    .then(response => displayNoteInForm(response));
}

function populateForm(id) {
    getNoteById(id);
}

function addNote (title, description) {

    const body = {
        title: title,
        description: description,
        isVisible: true
    };

    fetch('https://localhost:7242/api/notes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(data => data.json())
    .then(response => {
        clearForm();
        getAllNotes();
    });
}

function displayNotes(notes) {

    let allNotes = '';
    notes.forEach(note => {
        const noteElement = `
        <div class="note" data-id="${note.id}">
            <h3>${note.title}</h3>
            <p>${note.description}</p>
        </div>
        `;
        allNotes += noteElement;
    });
    notesContainer.innerHTML = allNotes;

    // Add Event Listener
    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('click', function() {
            // alert(note.dataset.id);
            populateForm(note.dataset.id);
        })
    });
}

function getAllNotes() {
    fetch('https://localhost:7242/api/notes')
    .then(data => data.json())
    .then(response => displayNotes(response));
}

function deleteNote(id) {
    fetch(`https://localhost:7242/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => {
        clearForm();
        getAllNotes();
    })
}

function updateNote(id, title, description) {

    const body = {
        title: title,
        description: description,
        isVisible: true
    };

    fetch(`https://localhost:7242/api/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then()
    .then(response => {
        clearForm();
        getAllNotes();
    })
}

getAllNotes();

saveButton.addEventListener('click', function() {

    const id = saveButton.dataset.id;
    if (id) {
        updateNote(id, titleInput.value, descInput.value);
    }
    else {
        addNote(titleInput.value, descInput.value);
    }
});

deleteButton.addEventListener('click', function() {
    const id = deleteButton.dataset.id;
    deleteNote(id);
});
