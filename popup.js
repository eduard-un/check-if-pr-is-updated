// Simple popup script
document.addEventListener('DOMContentLoaded', function() {
  // This could be expanded to show the current status of PRs
  // or provide configuration options in the future
  
  // For now, it just shows that the extension is active
  const statusElement = document.getElementById('status');
  statusElement.textContent = 'Extension active and monitoring GitHub PR pages';
});
