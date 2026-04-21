/*
 * ============================================================
 * GOOGLE APPS SCRIPT — Contact Form Email Handler
 * ============================================================
 * 
 * SETUP INSTRUCTIONS (takes 2 minutes):
 * 
 * 1. Go to https://script.google.com
 * 2. Click "+ New Project"
 * 3. Delete the default code and paste the code below (doPost function only)
 * 4. Click "Deploy" → "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy"
 * 9. Authorize when prompted (click Allow)
 * 10. Copy the Web App URL (looks like: https://script.google.com/macros/s/AKf.../exec)
 * 11. Paste that URL in your index.html form action attribute
 * 
 * That's it! Emails will be sent from YOUR Gmail to YOUR Gmail.
 * ============================================================
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var name = data.name || "No name";
    var email = data.email || "No email";
    var subject = data.subject || "New Contact Form Message";
    var message = data.message || "No message";
    
    // Send email to YOUR Gmail
    var recipientEmail = "putraardiansyah1610@gmail.com";
    
    var emailSubject = "Portfolio Contact: " + subject;
    var emailBody = "You received a new message from your portfolio website!\n\n"
      + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
      + "Name: " + name + "\n"
      + "Email: " + email + "\n"
      + "Subject: " + subject + "\n"
      + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
      + "Message:\n" + message + "\n\n"
      + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
      + "Sent from your portfolio contact form";
    
    var htmlBody = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>"
      + "<div style='background: linear-gradient(135deg, #6C63FF, #00D4AA); padding: 20px; border-radius: 10px 10px 0 0;'>"
      + "<h2 style='color: white; margin: 0;'>📩 New Contact Form Message</h2>"
      + "</div>"
      + "<div style='background: #f9f9f9; padding: 24px; border: 1px solid #eee;'>"
      + "<table style='width: 100%; border-collapse: collapse;'>"
      + "<tr><td style='padding: 8px 0; color: #666; width: 80px;'><strong>Name:</strong></td><td style='padding: 8px 0;'>" + name + "</td></tr>"
      + "<tr><td style='padding: 8px 0; color: #666;'><strong>Email:</strong></td><td style='padding: 8px 0;'><a href='mailto:" + email + "'>" + email + "</a></td></tr>"
      + "<tr><td style='padding: 8px 0; color: #666;'><strong>Subject:</strong></td><td style='padding: 8px 0;'>" + subject + "</td></tr>"
      + "</table>"
      + "<hr style='border: none; border-top: 1px solid #ddd; margin: 16px 0;'>"
      + "<p style='color: #333; line-height: 1.6;'>" + message.replace(/\n/g, "<br>") + "</p>"
      + "</div>"
      + "<div style='background: #333; color: #aaa; padding: 12px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;'>"
      + "Sent from your portfolio contact form"
      + "</div>"
      + "</div>";
    
    MailApp.sendEmail({
      to: recipientEmail,
      subject: emailSubject,
      body: emailBody,
      htmlBody: htmlBody,
      replyTo: email,
      name: "Portfolio Website"
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Email sent successfully!" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Contact form API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
