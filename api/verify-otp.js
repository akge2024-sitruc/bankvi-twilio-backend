// api/verify-otp.js
const twilio = require('twilio');

module.exports = async (req, res) => {
  // 🔒 Accepter seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      valid: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { phoneNumber, code } = req.body;

    // ✅ Validation
    if (!phoneNumber || !code) {
      return res.status(400).json({
        valid: false,
        error: 'phoneNumber et code requis'
      });
    }

    if (code.length !== 6) {
      return res.status(400).json({
        valid: false,
        error: 'Le code doit contenir 6 chiffres'
      });
    }

    // ✅ Créer client Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    console.log('🔐 Vérification code pour:', phoneNumber);

    // 🔐 VÉRIFIER CODE via Twilio
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks
      .create({
        to: phoneNumber,
        code: code
      });

    console.log('🔐 Résultat:', verificationCheck.status);

    // ✅ Code correct
    if (verificationCheck.status === 'approved') {
      return res.status(200).json({
        valid: true,
        message: 'Code correct'
      });
    }
    // ❌ Code incorrect
    else {
      return res.status(400).json({
        valid: false,
        message: 'Code incorrect ou expiré'
      });
    }

  } catch (error) {
    console.error('❌ Erreur vérification:', error.message);

    // ❌ Erreur
    return res.status(500).json({
      valid: false,
      error: error.message || 'Erreur vérification'
    });
  }
};