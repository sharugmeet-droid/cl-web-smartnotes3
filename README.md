The VibeCoding Journey
1. The Prompts (VibeCoding Phase)
I started by "vibing" the UI with a tool like Cursor or v0.dev using these prompts:

"Build a modern Notes App UI using HTML and CSS with a grid of cards."

"Add a dark mode toggle and make the cards have a clean shadow and rounded corners."

"Implement basic JavaScript to save notes to localStorage so they don't disappear on refresh."

2. Manual Implementation (The "Brains")
Once the layout was solid, I manually coded the following logic to make it "Smart":

Case-Insensitive Search: Used .toLowerCase() on both the query and the note content to ensure "Apple" matches "apple".

Visual Highlighting: Implemented a RegEx-based highlighter that wraps matching search terms in a <mark> tag dynamically.

AI Mocking: Created a generateSmartMetadata function. It simulates an AI by extracting long words as "tags" and randomly assigning a "mood" based on the note's vibe.

Pinning Logic: Added a pinned boolean to the note object. In the render function, the sort logic ensures that pinned: true always floats to the top regardless of the date.

JSON Export: Added a utility to stringify the localStorage data and trigger a browser download.
