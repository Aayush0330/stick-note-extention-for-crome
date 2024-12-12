document.getElementById("add-note").addEventListener("click", () => {
    const note = document.getElementById("note-input").value.trim();
    if (note) {
        chrome.storage.sync.get({ notes: [] }, (data) => {
            const updatedNotes = [...data.notes, note];
            chrome.storage.sync.set({ notes: updatedNotes }, () => {
                document.getElementById("note-input").value = "";
                renderNotes();
            });
        });
    }
});

function renderNotes() {
    chrome.storage.sync.get({ notes: [] }, (data) => {
        const notesList = document.getElementById("notes-list");
        notesList.innerHTML = "";
        data.notes.forEach((note, index) => {
            const noteItem = document.createElement("div");
            noteItem.textContent = note;
            noteItem.classList.add("note-item");
            noteItem.addEventListener("click", () => {
                const updatedNotes = data.notes.filter((_, i) => i !== index);
                chrome.storage.sync.set({ notes: updatedNotes }, renderNotes);
            });
            notesList.appendChild(noteItem);
        });
    });
}

renderNotes();
