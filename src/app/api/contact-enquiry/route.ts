import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_ADDRESSES = [
  'info@chopras.nl',
  'brianscott05o9@gmail.com',
]

const FROM_ADDRESS = 'Chopras Contact <noreply@chopras.nl>'

function buildEmailHtml(fields: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): string {
  const rows = [
    { label: 'Name', value: fields.name },
    { label: 'Email', value: `<a href="mailto:${fields.email}" style="color:#C7A348;">${fields.email}</a>` },
    ...(fields.phone ? [{ label: 'Phone', value: fields.phone }] : []),
    { label: 'Subject', value: fields.subject },
    { label: 'Message', value: fields.message.replace(/\n/g, '<br />') },
  ]

  const rowsHtml = rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px 16px;background:#f7f8fc;font-family:sans-serif;font-size:12px;font-weight:700;color:#1B2B5E;text-transform:uppercase;letter-spacing:0.08em;width:180px;border-bottom:1px solid #eee;vertical-align:top;">${label}</td>
          <td style="padding:10px 16px;font-family:sans-serif;font-size:14px;color:#1A1A1A;border-bottom:1px solid #eee;">${value}</td>
        </tr>`,
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f7f8fc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(27,43,94,0.1);">

          <tr>
            <td style="background:#1B2B5E;padding:28px 32px;">
              <p style="margin:0;font-family:sans-serif;font-size:11px;font-weight:700;color:#C7A348;text-transform:uppercase;letter-spacing:0.18em;">New Message</p>
              <h1 style="margin:6px 0 0;font-family:serif;font-size:26px;color:#fff;font-weight:600;">Contact / General Enquiry</h1>
              <p style="margin:6px 0 0;font-family:sans-serif;font-size:12px;color:rgba(255,255,255,0.55);">Submitted via Contact Form &bull; Chopras Indian Restaurant Den Haag</p>
            </td>
          </tr>

          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#C7A348,#D4AF37,#C7A348);"></td>
          </tr>

          <tr>
            <td style="padding:24px 32px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #eee;">
                ${rowsHtml}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px 32px;">
              <p style="margin:0 0 12px;font-family:sans-serif;font-size:13px;color:#1A1A1A;">Reply directly to this email to respond to ${fields.name}. Their address is <strong>${fields.email}</strong>.</p>
              <a href="mailto:${fields.email}?subject=Re: ${encodeURIComponent(fields.subject)} - Chopras Indian Restaurant"
                 style="display:inline-block;background:#C7A348;color:#1B2B5E;font-family:sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;padding:12px 24px;border-radius:8px;">
                Reply to ${fields.name}
              </a>
            </td>
          </tr>

          <tr>
            <td style="background:#f7f8fc;padding:16px 32px;border-top:1px solid #eee;">
              <p style="margin:0;font-family:sans-serif;font-size:11px;color:#1A1A1A;opacity:0.4;">Chopras Indian Restaurant &bull; Leyweg 986, 2545 GW Den Haag &bull; +31 6 30645930</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, subject, message } = body as {
      name: string
      email: string
      phone?: string
      subject: string
      message: string
    }

    if (!name || !email || !subject || !message) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const html = buildEmailHtml({ name, email, phone, subject, message })

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESSES,
      replyTo: email,
      subject: `Contact: ${subject} - ${name}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 },
      )
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact enquiry route error:', err)
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
