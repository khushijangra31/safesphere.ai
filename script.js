let contacts = [];
let countdownTimer = null;
let countdownValue = 0;

function showPage(pageId, btn) {
  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach((button) => button.classList.remove('active'));

  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');
  if (btn) btn.classList.add('active');
}

function renderContacts() {
  const list = document.getElementById('contactList');
  if (!list) return;

  list.innerHTML = '';
  contacts.forEach((contact) => {
    const li = document.createElement('li');
    li.textContent = `${contact.name} - ${contact.info}`;
    list.appendChild(li);
  });
}

function addContact() {
  const nameInput = document.getElementById('contactName');
  const infoInput = document.getElementById('contactInfo');

  if (!nameInput || !infoInput) return;

  const name = nameInput.value.trim();
  const info = infoInput.value.trim();

  if (!name || !info) {
    alert('Please enter contact name and phone/email');
    return;
  }

  contacts.push({ name, info });
  nameInput.value = '';
  infoInput.value = '';
  renderContacts();
  alert('Contact saved successfully');
}

function generateScore() {
  const destinationInput = document.getElementById('destination');
  if (!destinationInput) return;

  const dest = destinationInput.value.trim();
  if (!dest) {
    alert('Please enter destination');
    return;
  }

  const scoreBtn = document.querySelectorAll('.nav-btn')[1];
  showPage('score', scoreBtn);

  const scores = [92, 85, 78, 66, 74];
  const score = scores[Math.floor(Math.random() * scores.length)];

  const scoreCircle = document.getElementById('scoreCircle');
  const status = document.getElementById('status');
  const advice = document.getElementById('advice');

  if (!scoreCircle || !status || !advice) return;

  scoreCircle.textContent = score + '%';

  if (score >= 85) {
    scoreCircle.className = 'circle safe';
    status.className = 'status safe';
    status.textContent = 'Safe';
    advice.textContent = 'Good route choice. Keep live location on and move confidently.';
  } else if (score >= 70) {
    scoreCircle.className = 'circle warn';
    status.className = 'status warn';
    status.textContent = 'Caution';
    advice.textContent = 'Use main roads and avoid isolated areas. Share your trip with contacts.';
  } else {
    scoreCircle.className = 'circle danger';
    status.className = 'status danger';
    status.textContent = 'Risky';
    advice.textContent = 'High-risk route detected. Choose a safer path and notify trusted contacts.';
  }
}

function shareLocation() {
  const mapBtn = document.querySelectorAll('.nav-btn')[2];
  showPage('map', mapBtn);

  const locationText = document.getElementById('locationText');
  const mapLink = document.getElementById('mapLink');

  if (!navigator.geolocation) {
    if (locationText) locationText.textContent = 'Geolocation not supported';
    alert('Geolocation not supported.');
    return;
  }

  if (locationText) locationText.textContent = 'Fetching location...';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(6);
      const lon = pos.coords.longitude.toFixed(6);
      // Fixed string formatting bug below
      const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

      if (locationText) {
        locationText.textContent = `Latitude: ${lat}, Longitude: ${lon}`;
      }

      if (mapLink) {
        mapLink.innerHTML = `<a href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Open live location</a>`;
      }

      alert('Live location shared with trusted contacts (demo).');
    },
    () => {
      if (locationText) locationText.textContent = 'Location access denied.';
      alert('Location access denied.');
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
}

function triggerSOS() {
  const sosResult = document.getElementById('sosResult');
  if (!sosResult) return;

  const contactText = contacts.length
    ? contacts.map((contact) => `${contact.name} (${contact.info})`).join(', ')
    : 'No trusted contacts saved yet';

  sosResult.innerHTML = `
    <h3 class="danger">SOS Sent</h3>
    <p>Trusted contacts notified.</p>
    <p>${contactText}</p>
    <p>Live location shared successfully.</p>
  `;
}

function startSOS() {
  const sosBtn = document.querySelectorAll('.nav-btn')[3];
  showPage('sos', sosBtn);

  const countdownText = document.getElementById('countdownText');
  if (!countdownText) return;

  countdownValue = 5;
  countdownText.textContent = `SOS will trigger in ${countdownValue} seconds...`;

  if (countdownTimer) clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    countdownValue--;

    if (countdownValue > 0) {
      countdownText.textContent = `SOS will trigger in ${countdownValue} seconds...`;
    } else {
      clearInterval(countdownTimer);
      countdownTimer = null;
      countdownText.textContent = 'SOS triggered!';
      triggerSOS();
    }
  }, 1000);
}

function fakeCall() {
  const sosBtn = document.querySelectorAll('.nav-btn')[3];
  showPage('sos', sosBtn);

  const sosResult = document.getElementById('sosResult');
  if (!sosResult) return;

  sosResult.innerHTML = `
    <h3 class="warn">Fake Call Active</h3>
    <p>Incoming call simulated for escape support.</p>
    <p>Use this to exit uncomfortable situations safely.</p>
  `;
}

window.showPage = showPage;
window.generateScore = generateScore;
window.addContact = addContact;
window.shareLocation = shareLocation;
window.startSOS = startSOS;
window.fakeCall = fakeCall;

renderContacts();
console.log('script loaded');
