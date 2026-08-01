async function bookAppointment() {

  const name = document.getElementById("patientName").value.trim();
  const phone = document.getElementById("patientPhone").value.trim();
  const test = document.getElementById("patientTest").value;
  const date = document.getElementById("appointmentDate").value;

  if (!name || !phone || !test || !date) {
    alert("Please fill all appointment details.");
    return;
  }

  // Save appointment to Firestore
  try {

    const response = await fetch(
      "https://firestore.googleapis.com/v1/projects/ark-diagnostic-centre/databases/(default)/documents/appointments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fields: {
            name: {
              stringValue: name
            },
            phone: {
              stringValue: phone
            },
            test: {
              stringValue: test
            },
            date: {
              stringValue: date
            },
            createdAt: {
              timestampValue: new Date().toISOString()
            }
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error("Firestore save failed");
    }

    // WhatsApp Message
    const message =
      `Hello ARK Diagnostic Centre,\n\n` +
      `I would like to book an appointment.\n\n` +
      `Patient Name: ${name}\n` +
      `Mobile Number: ${phone}\n` +
      `Test / Package: ${test}\n` +
      `Preferred Date: ${date}\n\n` +
      `Please confirm my appointment.`;

    const whatsappURL =
      "https://wa.me/919398908582?text=" +
      encodeURIComponent(message);

    window.location.href = whatsappURL;

  } catch (error) {

    console.error("Appointment Error:", error);

    alert(
      "Appointment could not be saved. Please try again."
    );
  }
}
