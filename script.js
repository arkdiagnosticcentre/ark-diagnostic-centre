function bookAppointment() {

  const name = document.getElementById("patientName").value.trim();
  const phone = document.getElementById("patientPhone").value.trim();
  const test = document.getElementById("patientTest").value;
  const date = document.getElementById("appointmentDate").value;

  if (!name || !phone || !test || !date) {
    alert("Please fill all appointment details.");
    return;
  }

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
}
