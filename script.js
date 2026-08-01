function searchTests(){

const input=document.getElementById("searchBox").value.toUpperCase();

const cards=document.getElementsByClassName("price-card");

for(let i=0;i<cards.length;i++){

const text=cards[i].innerText;

cards[i].style.display=text.toUpperCase().includes(input)
? "block"
: "none";

}

}
// ARK Diagnostic Centre - WhatsApp Appointment Booking

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("patientName").value;
    const phone = document.getElementById("patientPhone").value;
    const test = document.getElementById("patientTest").value;
    const date = document.getElementById("appointmentDate").value;

    const message =
      `Hello ARK Diagnostic Centre,%0A%0A` +
      `I would like to book an appointment.%0A%0A` +
      `Patient Name: ${encodeURIComponent(name)}%0A` +
      `Mobile Number: ${encodeURIComponent(phone)}%0A` +
      `Test / Package: ${encodeURIComponent(test)}%0A` +
      `Preferred Date: ${encodeURIComponent(date)}%0A%0A` +
      `Please confirm my appointment.`;

    window.open(
      `https://wa.me/919398908582?text=${message}`,
      "_blank"
    );
  });
}
