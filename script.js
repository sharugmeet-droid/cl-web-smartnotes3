// --- STATE MANAGEMENT ---
let notes = JSON.parse(localStorage.getItem('smart_notes')) || [];

// --- CORE FUNCTIONS ---
function save() {
    localStorage.setItem('smart_notes', JSON.stringify(notes));
    renderNotes();
}

function addNote() {
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');
    
    if (!titleInput.value || !contentInput.value) return;

    // Manual Smart Logic: Mocking AI metadata
    const moods = ["😊 Happy", "💡 Insightful", "📝 Productive", "🤔 Thoughtful"];
    const tags = contentInput.value.split(' ').filter(word => word.length > 5).slice(0, 2);

    const newNote = {
        id: Date.now(),
        title: titleInput.value,
        content: contentInput.value,
        pinned: false,
        mood: moods[Math.floor(Math.random() * moods.length)],
        tags: tags.length ? tags : ["note"]
    };

    notes.push(newNote);
    titleInput.value = '';
    contentInput.value = '';
    save();
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    save();
}

function togglePin(id) {
    const note = notes.find(n => n.id === id);
    note.pinned = !note.pinned;
    save();
}

// --- MANUAL LOGIC: SEARCH & HIGHLIGHT ---
function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function renderNotes() {
    const grid = document.getElementById('notesGrid');
    const query = document.getElementById('searchBar').value.toLowerCase();
    const sortBy = document.getElementById('sortSelect').value;

    grid.innerHTML = '';

    // Filter & Sort
    let filtered = notes.filter(n => 
        n.title.toLowerCase().includes(query) || 
        n.content.toLowerCase().includes(query)
    );

    filtered.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return sortBy === 'newest' ? b.id - a.id : a.id - b.id;
    });

    // Render Cards
    filtered.forEach(note => {
        const card = document.createElement('div');
        card.className = `note-card ${note.pinned ? 'pinned' : ''}`;
        card.innerHTML = `
            <button class="pin-btn" onclick="togglePin(${note.id})">${note.pinned ? '📌' : '📍'}</button>
            <h3>${highlightText(note.title, query)}</h3>
            <p>${highlightText(note.content, query)}</p>
            <div>${note.tags.map(t => `<span class="tag">#${t}</span>`).join('')}</div>
            <div class="mood">AI Feeling: ${note.mood}</div>
            <button onclick="deleteNote(${note.id})" style="margin-top:15px; background:none; color:red; border:none; cursor:pointer;">Delete</button>
        `;
        grid.appendChild(card);
    });
}

// --- UTILITIES ---
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

function downloadJSON() {
    const blob = new Blob([JSON.stringify(notes, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "my-notes.json";
    a.click();
}

// Initial Load
renderNotes();