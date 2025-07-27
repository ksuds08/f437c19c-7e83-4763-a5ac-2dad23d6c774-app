document.getElementById('resume-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const jobTitle = document.getElementById('jobTitle').value;
  if (jobTitle) {
    fetch('/functions/api/handler.ts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jobTitle })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});