export const otpEmailTemplate = ({ name, otp }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(90deg,#2563eb,#4f46e5); padding:24px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px;">
                🎓 Smart Campus Placement Portal
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h2 style="color:#111827; margin-bottom:12px;">
                Verify your email
              </h2>

              <p style="color:#374151; font-size:15px; line-height:1.6;">
                Hi <strong>${name}</strong>,
                <br /><br />
                Thank you for registering with <b>Smart Campus Placement Portal</b>.
                Please use the OTP below to verify your email address.
              </p>

              <!-- OTP Box -->
              <div style="margin:32px 0; text-align:center;">
                <span style="
                  display:inline-block;
                  padding:14px 28px;
                  font-size:28px;
                  letter-spacing:6px;
                  font-weight:bold;
                  background:#f1f5f9;
                  color:#1e40af;
                  border-radius:8px;
                ">
                  ${otp}
                </span>
              </div>

              <p style="color:#374151; font-size:14px;">
                This OTP is valid for <b>10 minutes</b>.  
                Please do not share it with anyone.
              </p>

              <p style="color:#6b7280; font-size:13px; margin-top:24px;">
                If you did not request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                © ${new Date().getFullYear()} Smart Campus Placement Portal  
                <br />
                All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
