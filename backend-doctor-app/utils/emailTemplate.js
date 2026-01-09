export function emailTemplate(name, email, message) {
  const mailBody = `<body style="background:#f5f5f5;padding:20px;font-family:Arial">
    <div style="max-width:600px;background:#fff;margin:auto;padding:20px;border-radius:8px">

      <h2 style="color:#2563eb">📨 New Contact Message</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>

      <hr style="margin:20px 0"/>

      <p><strong>Message:</strong></p>
      <p style="background:#f1f5f9;padding:15px;border-radius:6px">
        ${message}
      </p>

      <p style="margin-top:30px;font-size:14px;color:#555">
        Sent from Contact Form
      </p>

    </div>
  </body>`;
  return mailBody;
}
