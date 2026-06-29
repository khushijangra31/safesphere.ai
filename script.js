function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

function generateScore() {
  const dest = document.getElementById('destination').value.trim();
  if (!dest) { alert('Please enter a destination first.'); return; }
  const score = Math.floor(Math.random() * 40) + 60;
  const circle = document.getElementById('scoreCircle');
  const status = document.getElementById('status');
  const advice = document.getElementById('advice');
  circle.textContent = score + '%';
  circle.className = 'circle';
  status.className = 'status';
  if (score >= 80) {
    circle.classList.add('safe'); status.classList.add('safe');
    status.textContent = 'Safe';
    advice.textContent = dest + ' looks safe. Main roads preferred.';
  } else if (score >= 60) {
    circle.classList.add('warn'); status.classList.add('warn');
    status.textContent = 'Moderate';
    advice.textContent = dest + ' has moderate risk. Share your location.';
  } else {
    circle.classList.add('danger'); status.classList.add('danger');
    status.textContent = 'Risky';
    advice.textContent = dest + ' is high-risk. Travel with someone.';
  }
  showPage('score', document.querySelectorAll('.nav-btn')[1]);
}

const contacts = [];
function addContact() {
  const name = document.getElementById('contactName').value.trim();
  const info = document.getElementById('contactInfo').value.trim();
  if (!name || !info) { alert('Enter both name and contact info.'); return; }
  contacts.push({ name, info });
  document.getElementById('contactName').value = '';
  document.getElementById('contactInfo').value = '';
  renderContacts();
}
function renderContacts() {
  const list = document.getElementById('contactList');
  list.innerHTML = contacts.map((c, i) =>
    '<li>👤 <strong>' + c.name + '</strong> — ' + c.info +
    ' <button onclick="removeContact(' + i + ')" style="margin-left:8px;padding:2px 8px;border-radius:8px;background:rgba(248,113,113,.25);color:#f87171;border:none;cursor:pointer;font-size:12px">Remove</button></li>'
  ).join('');
}
function removeContact(i) {
  contacts.splice(i, 1);
  renderContacts();
}

function shareLocation() {
  const text = document.getElementById('locationText');
  const link = document.getElementById('mapLink');
  if (!navigator.geolocation) { text.textContent = 'Geolocation not supported.'; return; }
  text.textContent = 'Fetching location...';
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const url = 'https://www.google.com/maps?q=' + lat + ',' + lng;
      text.textContent = '📍 ' + lat.toFixed(5) + ', ' + lng.toFixed(5);
      link.innerHTML = '<a href="' + url + '" target="_blank">' + url + '</a>';
    },
    function() { text.textContent = 'Permission denied.'; }
  );
}

let sosTimer = null;
function startSOS() {
  const countdown = document.getElementById('countdownText');
  const result = document.getElementById('sosResult');
  let seconds = 5;
  if (sosTimer) clearInterval(sosTimer);
  countdown.textContent = 'SOS sending in ' + seconds + '...';
  sosTimer = setInterval(function() {
    seconds--;
    if (seconds > 0) {
      countdown.textContent = 'SOS sending in ' + seconds + '...';
    } else {
      clearInterval(sosTimer);
      countdown.textContent = '🚨 SOS Sent!';
      result.innerHTML = '<h3>Status</h3><p style="color:var(--good);font-weight:700">✅ Emergency alert sent!</p>';
    }
  }, 1000);
}

function fakeCall() {
  const names = ['Mom', 'Riya', 'Arjun', 'Priya', 'Rahul'];
  const caller = names[Math.floor(Math.random() * names.length)];
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:linear-gradient(180deg,#0f172a,#050816);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#f8fafc;font-family:Inter,sans-serif;text-align:center;gap:16px;';
  overlay.innerHTML = '<div style="font-size:56px">📱</div><p style="font-size:13px;color:rgba(248,250,252,.6)">INCOMING CALL</p><h2 style="font-size:32px;font-weight:800">' + caller + '</h2><p style="color:rgba(248,250,252,.5)">Mobile</p><div style="display:flex;gap:40px;margin-top:24px"><button onclick="this.closest(\'div\').remove()" style="width:64px;height:64px;border-radius:50%;background:#ef4444;border:none;font-size:28px;cursor:pointer">📵</button><button onclick="this.closest(\'div\').remove()" style="width:64px;height:64px;border-radius:50%;background:#4ade80;border:none;font-size:28px;cursor:pointer">📞</button></div>';
  document.body.appendChild(overlay);
  setTimeout(function() { overlay.remove(); }, 20000);
}
