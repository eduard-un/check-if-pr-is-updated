// Default selectors for the elements we need to check
let SELECTORS = {
  // The update button that appears when a PR is behind the main branch
  UPDATE_BUTTON: '.btn-link[data-disable-with="Updating..."]', // Placeholder selector
  // The PR title element
  PR_TITLE: '.js-issue-title', // Placeholder selector
};

// Load custom selectors from options if available
function loadSelectors() {
  chrome.storage.sync.get({
    updateButtonSelector: SELECTORS.UPDATE_BUTTON,
    prTitleSelector: SELECTORS.PR_TITLE
  }, function(items) {
    SELECTORS.UPDATE_BUTTON = items.updateButtonSelector;
    SELECTORS.PR_TITLE = items.prTitleSelector;
    // Run check after loading selectors
    checkPrStatus();
  });
}

// Function to check if the PR is behind the main branch
function isPrBehindMain() {
  // First try with the selector from options
  const updateButtons = document.querySelectorAll(SELECTORS.UPDATE_BUTTON);
  
  // Check each button that matches the selector
  for (const button of updateButtons) {
    // Check if the button or any of its children contains 'Update branch' text
    if (button.textContent.includes('Update branch')) {
      return true;
    }
    
    // Also check for any span elements inside the button that might contain the text
    const spans = button.querySelectorAll('span');
    for (const span of spans) {
      if (span.textContent.includes('Update branch')) {
        return true;
      }
    }
  }
  
  // As a fallback, try to find any button on the page with 'Update branch' text
  const allButtons = document.querySelectorAll('button');
  for (const button of allButtons) {
    if (button.textContent.includes('Update branch')) {
      return true;
    }
  }
  
  return false;
}

// Function to add a warning after the PR title
function addWarningAfterTitle() {
  const prTitle = document.querySelector(SELECTORS.PR_TITLE);
  
  if (prTitle) {
    // Check if warning already exists to avoid duplicates
    const existingWarning = document.getElementById('pr-update-warning');
    
    if (!existingWarning) {
      const warningElement = document.createElement('span');
      warningElement.id = 'pr-update-warning';
      warningElement.textContent = '⚠️ This PR is behind the main branch and needs to be updated!';
      warningElement.style.color = 'red';
      warningElement.style.fontWeight = 'bold';
      warningElement.style.marginLeft = '10px';
      
      prTitle.insertAdjacentElement('afterend', warningElement);
    }
  }
}

// Function to remove the warning if it exists
function removeWarning() {
  const warning = document.getElementById('pr-update-warning');
  if (warning) {
    warning.remove();
  }
}

// Main function to check PR status and update UI
function checkPrStatus() {
  const needsUpdate = isPrBehindMain();
  
  if (needsUpdate) {
    addWarningAfterTitle();
    addUpdateButtonListener(); // Add listener when we detect the update button
  } else {
    removeWarning();
  }
}

// Function to add click listener to update button
function addUpdateButtonListener() {
  const updateButton = document.querySelector(SELECTORS.UPDATE_BUTTON);
  if (updateButton) {
    // Remove old listeners to avoid duplicates
    updateButton.removeEventListener('click', handleUpdateButtonClick);
    // Add new click listener
    updateButton.addEventListener('click', handleUpdateButtonClick);
  }
}

// Handler for update button click
function handleUpdateButtonClick() {
  console.log('Update button clicked, removing warning');
  removeWarning();
}

// Load selectors and then run the check when the page loads
loadSelectors();

// Set up a MutationObserver to detect changes in the DOM
// This helps handle dynamic content loading on GitHub
const observer = new MutationObserver((mutations) => {
  checkPrStatus();
  addUpdateButtonListener(); // Add listeners after DOM changes
});

// Start observing the document body for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Re-check status every few seconds to handle any edge cases
setInterval(() => {
  checkPrStatus();
  addUpdateButtonListener();
}, 5000);

// Listen for changes to the selectors in storage
chrome.storage.onChanged.addListener(function(changes) {
  if (changes.updateButtonSelector || changes.prTitleSelector) {
    loadSelectors();
  }
});
