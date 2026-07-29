const API_BASE = 'https://job-application-tracker-l8ws.onrender.com/api';

const loggedOutView = document.getElementById('loggedOutView');
const loggedInView = document.getElementById('loggedInView');
const statusEl = document.getElementById('status');

async function init() {
  const { jobtrack_token } = await chrome.storage.local.get('jobtrack_token');

  if (!jobtrack_token) {
    loggedOutView.style.display = 'block';
    setupTokenSave();
    return;
  }

  loggedInView.style.display = 'block';
  prefillFromPage();
  setupSave(jobtrack_token);
}

function setupTokenSave() {
  document.getElementById('saveTokenBtn').addEventListener('click', async () => {
    const token = document.getElementById('tokenInput').value.trim();
    if (!token) return;

    await chrome.storage.local.set({ jobtrack_token: token });
    loggedOutView.style.display = 'none';
    loggedInView.style.display = 'block';
    prefillFromPage();
    setupSave(token);
  });
}

function prefillFromPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'GET_JOB_INFO' }, (response) => {
      if (chrome.runtime.lastError || !response) return;

      document.getElementById('role').value = response.possibleRole || response.pageTitle || '';
      document.getElementById('company').value = response.possibleCompany || '';
    });
  });
}

function setupSave(token) {
  document.getElementById('saveBtn').addEventListener('click', async () => {
    const company = document.getElementById('company').value.trim();
    const role = document.getElementById('role').value.trim();
    const notes = document.getElementById('notes').value.trim();

    if (!company || !role) {
      statusEl.textContent = 'Company and role are required';
      statusEl.style.color = '#b91c1c';
      return;
    }

    const saveBtn = document.getElementById('saveBtn');
    saveBtn.disabled = true;
    statusEl.textContent = 'Saving...';
    statusEl.style.color = '#6b7280';

    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ company, role, notes }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save');
      }

      statusEl.textContent = '✅ Added to JobTrack!';
      statusEl.style.color = '#047857';
      saveBtn.disabled = false;
    } catch (err) {
      statusEl.textContent = `Error: ${err.message}`;
      statusEl.style.color = '#b91c1c';
      saveBtn.disabled = false;
    }
  });
}

init();