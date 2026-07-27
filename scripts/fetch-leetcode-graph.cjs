const https = require('https');
const fs = require('fs');
const path = require('path');

const USERNAME = process.argv[2] || 'harshchauhan06';
const OUT_PATH = path.resolve(__dirname, '..', 'src', 'data', 'leetcode-graph.json');

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', (err) => reject(err));
  });
}

function findKeyRecursive(obj, keyNames) {
  if (!obj || typeof obj !== 'object') return null;
  for (const k of Object.keys(obj)) {
    if (keyNames.includes(k) && obj[k] != null) return obj[k];
  }
  for (const k of Object.keys(obj)) {
    try {
      const found = findKeyRecursive(obj[k], keyNames);
      if (found != null) return found;
    } catch (e) {}
  }
  return null;
}

function normalizeCalendar(obj) {
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const k of Object.keys(obj)) {
    const v = obj[k] || 0;
    if (/^[0-9]{9,}$/.test(k)) {
      const ts = parseInt(k, 10) * 1000;
      const d = new Date(ts);
      const iso = d.toISOString().slice(0, 10);
      out[iso] = Number(v);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(k)) {
      out[k] = Number(v);
    } else {
      const n = Number(k);
      if (!Number.isNaN(n) && n > 1000000000) {
        const iso = new Date(n * 1000).toISOString().slice(0, 10);
        out[iso] = Number(v);
      } else {
        out[k] = Number(v);
      }
    }
  }
  return out;
}

(async () => {
  try {
    const url = `https://leetcode.com/${USERNAME}/`;
    console.log(`Fetching ${url} ...`);
    const html = await httpGet(url);

    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/i);
    let parsed = null;
    if (nextDataMatch) {
      try {
        parsed = JSON.parse(nextDataMatch[1]);
      } catch (e) {}
    }

    if (!parsed) {
      const initMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\})\s*;/);
      if (initMatch) {
        try {
          parsed = JSON.parse(initMatch[1]);
        } catch (e) {}
      }
    }

    let calendar = null;
    let acSubmissionNum = null;

    if (parsed) {
      calendar = findKeyRecursive(parsed, ['submissionCalendar', 'submitCalendar', 'submission_calendar', 'calendar', 'submissionCalendarMap']);
      acSubmissionNum = findKeyRecursive(parsed, ['acSubmissionNum', 'acSubmissionNums', 'acSubmissionStatistics']);
    }

    if (!calendar || !acSubmissionNum) {
      console.log('Attempting GraphQL query fallback...');
      const gqlQuery = JSON.stringify({
        query: `query getUserProfile($username: String!) {\n  matchedUser(username: $username) {\n    submitStats: submitStatsGlobal {\n      acSubmissionNum { difficulty count submissions }\n    }\n    submissionCalendar\n  }\n}\n`,
        variables: { username: USERNAME },
      });

      try {
        const graphql = await new Promise((resolve, reject) => {
          const req = https.request(
            'https://leetcode.com/graphql',
            { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(gqlQuery) } },
            (res) => {
              let d = '';
              res.on('data', (c) => (d += c));
              res.on('end', () => resolve(d));
            }
          );
          req.on('error', reject);
          req.write(gqlQuery);
          req.end();
        });
        const g = JSON.parse(graphql);
        const mu = g && g.data && g.data.matchedUser;
        if (mu) {
          if (!calendar) calendar = mu.submissionCalendar || mu.submitCalendar || null;
          if (!acSubmissionNum) acSubmissionNum = (mu.submitStats && mu.submitStats.acSubmissionNum) || mu.submitStats || null;
          if (!acSubmissionNum) {
            const arr = findKeyRecursive(g, ['acSubmissionNum']);
            if (arr) acSubmissionNum = arr;
          }
        }
      } catch (e) {}
    }

    const normalizedCalendar = normalizeCalendar(calendar || {});

    let totalSolved = 0, easySolved = 0, mediumSolved = 0, hardSolved = 0;

    if (Array.isArray(acSubmissionNum)) {
      for (const entry of acSubmissionNum) {
        const diff = String(entry.difficulty || entry["difficulty"] || '').toLowerCase();
        const count = Number(entry.count || entry["count"] || 0);
        if (diff.includes('all')) totalSolved = count;
        else if (diff.includes('easy')) easySolved = count;
        else if (diff.includes('medium')) mediumSolved = count;
        else if (diff.includes('hard')) hardSolved = count;
      }
      if (!totalSolved) totalSolved = easySolved + mediumSolved + hardSolved;
    } else if (acSubmissionNum && typeof acSubmissionNum === 'object') {
      totalSolved = Number(acSubmissionNum.total || acSubmissionNum.All || acSubmissionNum.all || 0);
      easySolved = Number(acSubmissionNum.easy || acSubmissionNum.Easy || 0);
      mediumSolved = Number(acSubmissionNum.medium || acSubmissionNum.Medium || 0);
      hardSolved = Number(acSubmissionNum.hard || acSubmissionNum.Hard || 0);
      if (!totalSolved) totalSolved = easySolved + mediumSolved + hardSolved;
    }

    const out = {
      username: USERNAME,
      submissionCalendar: normalizedCalendar,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      fetchedAt: new Date().toISOString(),
    };

    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Wrote ${OUT_PATH}`);
  } catch (err) {
    console.error('Error fetching or parsing:', err);
    process.exitCode = 1;
  }
})();