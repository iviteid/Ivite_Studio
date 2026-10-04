const RSVP_EMAIL = 'hi.nana00x@gmail.com';
const RSVP_SHEET_NAME = 'RSVP';
const RSVP_SHEET_PROPERTY = 'RSVP_SHEET_ID';

function setup() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty(RSVP_SHEET_PROPERTY);
  let spreadsheet;

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create('Wedding RSVP and Check-in');
    properties.setProperty(RSVP_SHEET_PROPERTY, spreadsheet.getId());
  }

  let sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(RSVP_SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted At', 'Guest Name', 'Guest Count', 'Attendance', 'Message', 'Ticket Token', 'Ticket Status', 'Checked In At']);
    sheet.setFrozenRows(1);
  }

  console.log('RSVP spreadsheet: ' + spreadsheet.getUrl());
  return spreadsheet.getUrl();
}

function doPost(event) {
  const parameters = event && event.parameter ? event.parameter : {};

  try {
    const name = cleanText(parameters.name, 120);
    const message = cleanText(parameters.message, 1000);
    const attendance = parameters.attendance === 'tidak' ? 'Tidak hadir' : 'Hadir';
    const pax = Math.max(1, Math.min(3, Number(parameters.pax) || 1));
    if (!name || !message) throw new Error('Nama dan doa wajib diisi.');

    const sheet = getRsvpSheet_();
    const token = Utilities.getUuid().replace(/-/g, '');
    const submittedAt = new Date();
    const status = attendance === 'Hadir' ? 'Valid' : 'Tidak hadir';

    sheet.appendRow([submittedAt, name, pax, attendance, message, token, status, '']);

    const ticketUrl = ScriptApp.getService().getUrl() + '?verify=' + encodeURIComponent(token);
    const emailBody = [
      'RSVP baru untuk pernikahan Ji-hoon & Ha-eun',
      '',
      'Nama: ' + name,
      'Jumlah tamu: ' + pax,
      'Kehadiran: ' + attendance,
      'Doa: ' + message,
      attendance === 'Hadir' ? 'Link verifikasi tiket: ' + ticketUrl : ''
    ].filter(Boolean).join('\n');

    MailApp.sendEmail({
      to: RSVP_EMAIL,
      subject: 'RSVP ' + attendance + ' - ' + name,
      body: emailBody
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true,
        attendance: attendance,
        name: name,
        pax: pax,
        token: attendance === 'Hadir' ? token : ''
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: error.message || 'RSVP gagal disimpan.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(event) {
  const params = event && event.parameter ? event.parameter : {};
  if (params.verify) return verificationPage_(String(params.verify));
  if (params.action === 'rsvp') return handleRsvpGet_(params);
  return HtmlService.createHtmlOutput('Wedding RSVP endpoint is ready.');
}

function handleRsvpGet_(params) {
  const callback = /^[a-zA-Z_$][\w$]*$/.test(params.callback || '') ? params.callback : '';

  function respond(data) {
    const json = JSON.stringify(data);
    return ContentService
      .createTextOutput(callback ? callback + '(' + json + ')' : json)
      .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
  }

  try {
    const name = cleanText(params.name, 120);
    const message = cleanText(params.message, 1000);
    const attendance = params.attendance === 'tidak' ? 'Tidak hadir' : 'Hadir';
    const pax = Math.max(1, Math.min(3, Number(params.pax) || 1));
    if (!name || !message) throw new Error('Nama dan doa wajib diisi.');

    const sheet = getRsvpSheet_();
    const token = Utilities.getUuid().replace(/-/g, '');
    const status = attendance === 'Hadir' ? 'Valid' : 'Tidak hadir';
    sheet.appendRow([new Date(), name, pax, attendance, message, token, status, '']);

    const ticketUrl = ScriptApp.getService().getUrl() + '?verify=' + encodeURIComponent(token);
    const emailBody = [
      'RSVP baru untuk pernikahan Ji-hoon & Ha-eun',
      '',
      'Nama: ' + name,
      'Jumlah tamu: ' + pax,
      'Kehadiran: ' + attendance,
      'Doa: ' + message,
      attendance === 'Hadir' ? 'Link verifikasi tiket: ' + ticketUrl : ''
    ].filter(Boolean).join('\n');

    MailApp.sendEmail({
      to: RSVP_EMAIL,
      subject: 'RSVP ' + attendance + ' - ' + name,
      body: emailBody
    });

    return respond({ ok: true, attendance: attendance, name: name, pax: pax, token: attendance === 'Hadir' ? token : '' });

  } catch (error) {
    return respond({ ok: false, error: error.message || 'RSVP gagal disimpan.' });
  }
}

function checkIn(token) {
  const sheet = getRsvpSheet_();
  const rows = sheet.getDataRange().getValues();
  for (let row = 1; row < rows.length; row++) {
    if (String(rows[row][5]) !== String(token)) continue;
    if (rows[row][6] !== 'Valid') {
      return { ok: false, message: rows[row][6] === 'Checked In' ? 'Tiket ini sudah pernah digunakan.' : 'Tiket tidak valid.' };
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const currentStatus = sheet.getRange(row + 1, 7).getValue();
      if (currentStatus !== 'Valid') {
        return { ok: false, message: 'Tiket ini sudah pernah digunakan.' };
      }
      sheet.getRange(row + 1, 7, 1, 2).setValues([['Checked In', new Date()]]);
      return { ok: true, name: rows[row][1], pax: rows[row][2], message: 'Check-in berhasil.' };
    } finally {
      lock.releaseLock();
    }
  }

  return { ok: false, message: 'Tiket tidak ditemukan.' };
}

function verificationPage_(token) {
  const sheet = getRsvpSheet_();
  const rows = sheet.getDataRange().getValues();
  let ticket = null;
  for (let row = 1; row < rows.length; row++) {
    if (String(rows[row][5]) === token) {
      ticket = { name: rows[row][1], pax: rows[row][2], status: rows[row][6] };
      break;
    }
  }

  const safeToken = JSON.stringify(token).replace(/</g, '\\u003c');
  const safeTicket = JSON.stringify(ticket).replace(/</g, '\\u003c');
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Verifikasi Tiket</title><style>body{margin:0;background:#f5f3f0;color:#1b1c1a;font:16px Arial,sans-serif;display:grid;min-height:100vh;place-items:center}.ticket{width:min(420px,calc(100% - 40px));box-sizing:border-box;background:white;border:1px solid #d3e7e1;border-radius:24px;padding:28px;box-shadow:0 12px 36px #45636920}h1{font-size:22px;color:#456369;margin:0 0 20px}p{line-height:1.5}.status{padding:12px;border-radius:12px;background:#eef5f2;color:#244348}button{width:100%;border:0;border-radius:999px;padding:14px;background:#456369;color:white;font-weight:700;font-size:14px;cursor:pointer}button:disabled{opacity:.55}</style></head><body><main class="ticket"><h1>Verifikasi Kehadiran</h1><div id="ticket-info"></div><button id="checkin" hidden>Konfirmasi Check-in</button><p id="result" role="status"></p></main><script>const token=${safeToken};const ticket=${safeTicket};const info=document.getElementById('ticket-info');const button=document.getElementById('checkin');const result=document.getElementById('result');if(!ticket){info.innerHTML='<p class="status">Tiket tidak valid atau tidak ditemukan.</p>';}else{info.innerHTML='<p><strong>Nama:</strong> '+escapeHtml(ticket.name)+'</p><p><strong>Jumlah tamu:</strong> '+ticket.pax+'</p><p class="status">Status: '+escapeHtml(ticket.status)+'</p>';if(ticket.status==='Valid')button.hidden=false;else result.textContent='Tiket ini sudah tidak dapat digunakan.';}function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}button.addEventListener('click',()=>{button.disabled=true;google.script.run.withSuccessHandler(response=>{result.textContent=response.message;if(response.ok){button.hidden=true;info.querySelector('.status').textContent='Status: Checked In';}else button.disabled=false;}).withFailureHandler(()=>{result.textContent='Tidak dapat memverifikasi tiket. Coba lagi.';button.disabled=false;}).checkIn(token);});</script></body></html>`;
  return HtmlService.createHtmlOutput(html).setTitle('Verifikasi Tiket - Ji-hoon & Ha-eun');
}

function resultPageLegacy_(payload) {
  const serialized = JSON.stringify(payload).replace(/</g, '\\u003c');
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Konfirmasi RSVP</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f3f0;color:#1b1c1a;font:16px Arial,sans-serif}.card{box-sizing:border-box;width:min(440px,calc(100% - 32px));padding:28px;border:1px solid #d3e7e1;border-radius:24px;background:#fff;text-align:center}.mark{width:52px;height:52px;margin:0 auto 16px;border-radius:50%;display:grid;place-items:center;background:#d3e7e1;color:#244348;font-size:26px}h1{margin:0 0 10px;color:#456369;font-size:24px}p{line-height:1.5;color:#56615e}.qr{width:240px;height:240px;margin:20px auto}.qr canvas{width:100%;height:100%}a,button{display:inline-block;box-sizing:border-box;margin-top:12px;padding:13px 20px;border:0;border-radius:999px;background:#456369;color:white;text-decoration:none;font-weight:700;cursor:pointer}.error .mark{background:#ffdad6;color:#93000a}</style></head><body><main class="card" id="card"><div class="mark" id="mark"></div><h1 id="title"></h1><p id="message"></p><p id="guest"></p><div class="qr" id="qr"></div><a id="verify" hidden>Uji tautan verifikasi</a><p id="hint"></p></main><script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js"></script><script>const result=${serialized};const card=document.getElementById('card');const mark=document.getElementById('mark');const title=document.getElementById('title');const message=document.getElementById('message');const guest=document.getElementById('guest');const qr=document.getElementById('qr');const verify=document.getElementById('verify');const hint=document.getElementById('hint');if(!result.ok){card.classList.add('error');mark.textContent='!';title.textContent='RSVP belum berhasil';message.textContent=result.error||'Terjadi kesalahan saat menyimpan konfirmasi.';hint.textContent='Kembali ke undangan, periksa data, lalu coba lagi.';}else{mark.textContent='✓';title.textContent='Konfirmasi terkirim';guest.textContent=result.name+' · '+result.pax+' tamu';if(result.attendance==='Hadir'&&result.token){message.textContent='Data tersimpan. Tunjukkan QR ini kepada petugas saat tiba.';const ticketUrl=${JSON.stringify(ScriptApp.getService().getUrl() + '?verify=') }+encodeURIComponent(result.token);const canvas=document.createElement('canvas');QRCode.toCanvas(canvas,ticketUrl,{width:240,margin:1,errorCorrectionLevel:'M'},error=>{if(error){message.textContent='RSVP berhasil disimpan, tetapi QR gagal dibuat. Hubungi penyelenggara untuk tiket.';return;}qr.appendChild(canvas);verify.href=ticketUrl;verify.hidden=false;});hint.textContent='Simpan tab ini atau ambil tangkapan layar QR untuk check-in.';}else{qr.hidden=true;message.textContent='Terima kasih sudah mengonfirmasi. RSVP Anda sudah tersimpan.';}}</script></body></html>`;
  return HtmlService.createHtmlOutput(html).setTitle('Konfirmasi RSVP - Ji-hoon & Ha-eun');
}

function resultPageWithQr_(payload) {
  const safePayload = JSON.stringify(payload).replace(/</g, '\\u003c');
  const verificationBase = ScriptApp.getService().getUrl() + '?verify=';
  const safeVerificationBase = JSON.stringify(verificationBase).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="id">
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Konfirmasi RSVP - Ji-hoon &amp; Ha-eun</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f3f0;color:#1b1c1a;font:16px Arial,sans-serif}
    .card{box-sizing:border-box;width:min(440px,calc(100% - 32px));padding:28px;border:1px solid #d3e7e1;border-radius:24px;background:#fff;text-align:center}
    .mark{width:52px;height:52px;margin:0 auto 16px;border-radius:50%;display:grid;place-items:center;background:#d3e7e1;color:#244348;font-size:26px}
    h1{margin:0 0 10px;color:#456369;font-size:24px}p{line-height:1.5;color:#56615e}
    .qr{display:block;width:240px;height:240px;margin:18px auto;image-rendering:pixelated}
    .qr[hidden]{display:none!important}
    a{display:inline-block;margin-top:10px;padding:13px 20px;border-radius:999px;background:#456369;color:white;text-decoration:none;font-weight:700}
    .error .mark{background:#ffdad6;color:#93000a}
  </style>
</head>
<body>
  <main class="card" id="card">
    <div class="mark" id="mark"></div>
    <h1 id="title"></h1>
    <p id="message"></p>
    <p id="guest"></p>
    <img class="qr" id="qr" alt="QR tiket verifikasi kehadiran" hidden>
    <a id="verify" hidden>Buka tautan verifikasi</a>
    <p id="hint"></p>
  </main>
  <script>
    const result = ${safePayload};
    const card = document.getElementById('card');
    const mark = document.getElementById('mark');
    const title = document.getElementById('title');
    const message = document.getElementById('message');
    const guest = document.getElementById('guest');
    const qr = document.getElementById('qr');
    const verify = document.getElementById('verify');
    const hint = document.getElementById('hint');

    if (!result.ok) {
      card.classList.add('error');
      mark.textContent = '!';
      title.textContent = 'RSVP belum berhasil';
      message.textContent = result.error || 'Terjadi kesalahan saat menyimpan konfirmasi.';
      hint.textContent = 'Kembali ke undangan, periksa data, lalu coba lagi.';
    } else {
      mark.textContent = '✓';
      title.textContent = 'Konfirmasi terkirim';
      guest.textContent = result.name + ' · ' + result.pax + ' tamu';
      if (result.attendance === 'Hadir' && result.token) {
        const ticketUrl = ${safeVerificationBase} + encodeURIComponent(result.token);
        message.textContent = 'Data tersimpan. Tunjukkan QR ini kepada petugas saat tiba.';
        qr.src = 'https://quickchart.io/qr?size=240&margin=1&text=' + encodeURIComponent(ticketUrl);
        qr.hidden = false;
        qr.addEventListener('error', () => {
          qr.hidden = true;
          message.textContent = 'QR tidak dapat dimuat. Gunakan tautan verifikasi di bawah.';
        });
        verify.href = ticketUrl;
        verify.hidden = false;
        hint.textContent = 'Simpan halaman ini atau ambil tangkapan layar QR untuk check-in.';
      } else {
        message.textContent = 'Terima kasih sudah mengonfirmasi. RSVP Anda sudah tersimpan.';
      }
    }
  </script>
</body>
</html>`;

  return HtmlService.createHtmlOutput(html).setTitle('Konfirmasi RSVP - Ji-hoon & Ha-eun');
}

function postMessageResult_(payload) {
  const serialized = JSON.stringify(payload).replace(/</g, '\\u003c');
  const html = '<!doctype html><html><body><script>window.top.postMessage(' + serialized + ', "*");</script></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('RSVP');
}

function getRsvpSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(RSVP_SHEET_PROPERTY);
  if (!spreadsheetId) throw new Error('Jalankan fungsi setup() terlebih dahulu.');
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(RSVP_SHEET_NAME);
  if (!sheet) throw new Error('Sheet RSVP tidak ditemukan. Jalankan setup() kembali.');
  return sheet;
}

function cleanText(value, maxLength) {
  return String(value || '').replace(/[\x00-\x1F\x7F]/g, ' ').trim().slice(0, maxLength);
}
