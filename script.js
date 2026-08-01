function searchTests() {
  const input = document.getElementById("searchBox").value.toUpperCase();
  const cards = document.getElementsByClassName("price-card");

  for (let i = 0; i < cards.length; i++) {
    const text = cards[i].innerText;

    cards[i].style.display = text.toUpperCase().includes(input)
      ? "block"
      : "none";
  }
}

// ARK Diagnostic Centre Appointment Booking

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("patientName").value.trim();
    const phone = document.getElementById("patientPhone").value.trim();
    const test = document.getElementById("patientTest").value.trim();
    const date = document.getElementById("appointmentDate").value;

    try {
      // Save appointment to Firestore
      const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/ark-diagnostic-centre/databases/(default)/documents/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fields: {
              name: { stringValue: name },
              phone: { stringValue: phone },
              test: { stringValue: test },
              date: { stringValue: date },
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

      alert("Appointment booked successfully!");

      // WhatsApp message
      const message =
        `Hello ARK Diagnostic Centre,\n\n` +
        `I would like to book an appointment.\n\n` +
        `Patient Name: ${name}\n` +
        `Mobile Number: ${phone}\n` +
        `Test / Package: ${test}\n` +
        `Preferred Date: ${date}\n\n` +
        `Please confirm my appointment.`;

      window.open(
        `https://wa.me/919398908582?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      appointmentForm.reset();

    } catch (error) {
      console.error(error);

      alert(
        "Appointment could not be saved. Please check Firestore permissions."
      );
    }
  });
}
