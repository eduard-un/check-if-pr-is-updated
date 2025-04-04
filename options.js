// Default selectors
const DEFAULT_SELECTORS = {
  UPDATE_BUTTON: '.btn-link[data-disable-with="Updating..."]',
  PR_TITLE: '.js-issue-title'
};

// Save options to Chrome storage
function saveOptions() {
  const updateButtonSelector = document.getElementById('updateButtonSelector').value;
  const prTitleSelector = document.getElementById('prTitleSelector').value;
  
  chrome.storage.sync.set({
    updateButtonSelector: updateButtonSelector || DEFAULT_SELECTORS.UPDATE_BUTTON,
    prTitleSelector: prTitleSelector || DEFAULT_SELECTORS.PR_TITLE
  }, function() {
    // Update status to let user know options were saved
    const status = document.getElementById('status');
    status.textContent = 'Options saved!';
    status.className = 'status success';
    status.style.display = 'block';
    
    setTimeout(function() {
      status.style.display = 'none';
    }, 3000);
  });
}

// Restore options from Chrome storage
function restoreOptions() {
  chrome.storage.sync.get({
    updateButtonSelector: DEFAULT_SELECTORS.UPDATE_BUTTON,
    prTitleSelector: DEFAULT_SELECTORS.PR_TITLE
  }, function(items) {
    document.getElementById('updateButtonSelector').value = items.updateButtonSelector;
    document.getElementById('prTitleSelector').value = items.prTitleSelector;
  });
}

// Initialize the options page
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
