const admin = require("firebase-admin");

function getFirebaseAdmin() {
  if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  }

  return admin;
}

module.exports = async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const phone = String(req.query.phone || "").replace(/\D/g, "");

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        error: "Please enter a valid 10-digit mobile number.",
      });
    }

    const firebaseAdmin = getFirebaseAdmin();
    const db = firebaseAdmin.firestore();

    const snapshot = await db
      .collection("appointments")
      .where("phone", "==", phone)
      .get();

    const reports = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (data.reportURL) {
        reports.push({
          id: doc.id,
          name: data.name || "Patient",
          test: data.test || "-",
          date: data.date || "-",
          reportURL: data.reportURL,
        });
      }
    });

    return res.status(200).json({
      success: true,
      reports: reports,
    });

  } catch (error) {
    console.error("Report API Error:", error);

    return res.status(500).json({
      error: "Unable to load reports.",
    });
  }
};
