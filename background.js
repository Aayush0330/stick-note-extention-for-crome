chrome.runtime.onInstalled.addListener(() => {
    console.log("Sticky Notes extension installed!");
    
    // Initialize storage with an empty array for notes if not already set
    chrome.storage.sync.get({ notes: [] }, (data) => {
        if (!data.notes.length) {
            chrome.storage.sync.set({ notes: [] });
        }
    });
});

// Listener for messages (if needed)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getNotes") {
        chrome.storage.sync.get({ notes: [] }, (data) => {
            sendResponse({ notes: data.notes });
        });
        return true; // Keep the messaging channel open for async response
    }

    if (message.action === "addNote") {
        chrome.storage.sync.get({ notes: [] }, (data) => {
            const updatedNotes = [...data.notes, message.note];
            chrome.storage.sync.set({ notes: updatedNotes }, () => {
                sendResponse({ success: true });
            });
        });
        return true;
    }

    if (message.action === "clearNotes") {
        chrome.storage.sync.set({ notes: [] }, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});
