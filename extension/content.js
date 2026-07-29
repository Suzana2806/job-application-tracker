// This script runs on every page. It listens for a message from the popup
// and responds with extracted job info from the current page.

function extractJobInfo() {
  const pageTitle = document.title || '';

  // Try to find a heading that likely contains the job title
  const h1 = document.querySelector('h1');
  const possibleRole = h1 ? h1.innerText.trim() : '';

  // Try common patterns for company name (LinkedIn, Internshala, generic)
  let possibleCompany = '';

  const companySelectors = [
    '.job-details-jobs-unified-top-card__company-name', // LinkedIn
    '.company_name', // Internshala-style
    '[class*="company"]', // generic fallback
  ];

  for (const selector of companySelectors) {
    const el = document.querySelector(selector);
    if (el && el.innerText.trim()) {
      possibleCompany = el.innerText.trim();
      break;
    }
  }

  return {
    pageTitle,
    possibleRole,
    possibleCompany,
    url: window.location.href,
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_JOB_INFO') {
    const info = extractJobInfo();
    sendResponse(info);
  }
  return true;
});