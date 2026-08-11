const admin = require("firebase-admin");

function getFirebaseAdmin() {

  if (!admin.apps.length) {

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {

  const missing = [];

  if (!projectId) missing.push("FIREBASE_PROJECT_ID");
  if (!clientEmail) missing.push("FIREBASE_CLIENT_EMAIL");
  if (!privateKey) missing.push("FIREBASE_PRIVATE_KEY");

  throw new Error(
    "Missing Firebase variable(s): " + missing.join(", ")
  );

}

      credential: admin.credential.cert({

        projectId: projectId,

        clientEmail: clientEmail,

        privateKey: privateKey.replace(/\\n/g, "\n")

      })

    });

  }

  return admin;

}


module.exports = async function handler(req, res) {

  if (req.method !== "GET") {

    return res.status(405).json({
      error: "Method not allowed"
    });

  }


  try {

    const phone =
      String(req.query.phone || "")
      .replace(/\D/g, "")
      .trim();


    if (!/^\d{10}$/.test(phone)) {

      return res.status(400).json({

        error:
        "Please enter a valid 10-digit mobile number."

      });

    }


    const firebaseAdmin =
      getFirebaseAdmin();


    const db =
      firebaseAdmin.firestore();


    const snapshot =
      await db
      .collection("appointments")
      .where("phone", "==", phone)
      .get();


    const reports = [];


    snapshot.forEach((doc) => {

      const data = doc.data();


      if (data.reportURL) {

        reports.push({

          id: doc.id,

          name:
          data.name || "Patient",

          phone:
          data.phone || "",

          test:
          data.test || "-",

          date:
          data.date || "-",

          reportURL:
          data.reportURL

        });

      }

    });


    return res.status(200).json({

      success: true,

      reports: reports

    });


  } catch (error) {

    console.error(
      "REPORT API ERROR:",
      error
    );


    return res.status(500).json({

      error:
      error.message ||
      "Unable to load reports."

    });

  }

};
