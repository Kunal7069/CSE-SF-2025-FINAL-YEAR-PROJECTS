import Booking from '../models/booking.model.js';
import Service from '../models/service.model.js';
import Expert from '../models/expert.model.js';
import { createZoomMeeting } from '../utils/zoom.js';
import { sendEmail } from '../utils/mailer.js';

export const confirmBooking = async (req, res) => {
  try {
    const { serviceId, date, times = [], message } = req.body;
    const bookedById = req.expert._id;

    // Validate inputs
    if (!serviceId || !date || !times.length) {
      return res.status(400).json({ message: 'Missing required booking details.' });
    }

    // Get service and expert
    const service = await Service.findById(serviceId).populate('expert');
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Prevent self-booking
    if (bookedById.toString() === service.expert._id.toString()) {
      return res.status(403).json({ message: 'You cannot book your own service.' });
    }

    // Combine date + first selected time
    const [firstTime] = times;
    const startTimeISO = new Date(`${date}T${firstTime}`).toISOString();

    // Create Zoom meeting
    const meeting = await createZoomMeeting(service.name, startTimeISO, service.duration);

    // Create booking
    const booking = await Booking.create({
      service: service._id,
      bookedBy: bookedById,
      meetingLink: meeting.join_url,
      startTime: startTimeISO,
      userMessage: message,
    });

    const bookedBy = await Expert.findById(bookedById);

    // Format date & time (no seconds)
    const formattedTime = new Date(startTimeISO).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const formattedDate = new Date(startTimeISO).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // ==== 💌 Email Design Helpers ====
    const companyLogo = "https://ik.imagekit.io/mcxbnqee6/ChatGPT%20Image%20Apr%2017,%202025,%2002_49_25%20PM.png?updatedAt=1744881620804"; // Replace with your real logo
    const companyName = "GuideCircle";

    const meetingLinkBtn = (url) => `
      <a href="${url}" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #1B4242;
        color: #fff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: background 0.3s;
      " onmouseover="this.style.backgroundColor='#145353'" onmouseout="this.style.backgroundColor='#1B4242'">
        🚀 Join Zoom Meeting
      </a>
    `;

    const baseTemplate = (recipientName, bodyContent) => `
      <div style="max-width: 650px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; padding: 24px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
        <div style="text-align: center;">
          <img src="${companyLogo}" alt="${companyName} Logo" style="height: 60px; margin-bottom: 20px;" />
        </div>
        <h2 style="color: #1B4242;">Hi ${recipientName},</h2>
        ${bodyContent}
        <p style="margin-top: 30px; color: #666;">Thanks for being with <strong>${companyName}</strong>. We’re excited to connect you! 🌟</p>
        <div style="text-align: center; margin-top: 20px;">
          <small style="color: #999;">&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</small>
        </div>
      </div>
    `;

    const serviceDetailsHtml = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
        <tr style="background-color: #f4f4f4;">
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">🗓️ Date</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formattedDate}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">🕒 Time</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formattedTime}</td>
        </tr>
        <tr style="background-color: #f4f4f4;">
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">⏳ Duration</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${service.duration} Minutes</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">💰 Price</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;"> ₹ ${service.price}</td>
        </tr>
      </table>
    `;

    const ownerEmailBody = baseTemplate(service.expert.name, `
      <p style="font-size: 16px;">🎉 <strong>Great news!</strong> You’ve received a new booking for <strong>${service.name}</strong> from <strong>${bookedBy.name}</strong>.</p>
      ${serviceDetailsHtml}
      <p style="margin-top: 20px;"><strong>💬 Message from the client:</strong></p>
      <div style="background-color: #fefefe; padding: 12px; border-left: 4px solid #1B4242; margin: 10px 0; font-style: italic;">
        ${message || "No additional message provided."}
      </div>
      <p style="margin-top: 25px;">🔗 Ready to start? Click below to join the Zoom meeting:</p>
      ${meetingLinkBtn(meeting.join_url)}
    `);

    const userEmailBody = baseTemplate(bookedBy.name, `
      <p style="font-size: 16px;">✅ <strong>Your booking is confirmed!</strong> You're scheduled for <strong>${service.name}</strong> with <strong>${service.expert.name}</strong>.</p>
      ${serviceDetailsHtml}
      <p style="margin-top: 20px;"><strong>📝 Your Message:</strong></p>
      <div style="background-color: #fefefe; padding: 12px; border-left: 4px solid #1B4242; margin: 10px 0; font-style: italic;">
        ${message || "No message added, but we’re sure it’ll be a great session!"}
      </div>
      <p style="margin-top: 25px;">🔗 Join your Zoom session here:</p>
      ${meetingLinkBtn(meeting.join_url)}
    `);

    // Send Emails
    await Promise.all([
      sendEmail(service.expert.email, '📅 New Booking for Your Service', ownerEmailBody),
      sendEmail(bookedBy.email, '✅ Your Booking is Confirmed', userEmailBody),
    ]);

    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    console.error('Error confirming booking:', error.message);
    res.status(500).json({ message: error.message });
  }
};


