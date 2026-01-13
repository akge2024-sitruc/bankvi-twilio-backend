// api/send-otp.js
const twilio = require('twilio');

module.exports = async (req, res) => {
  // 🔒 Accepter seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { phoneNumber } = req.body;

    // ✅ Validation
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'phoneNumber requis'
      });
    }

    if (!phoneNumber.startsWith('+228')) {
      return res.status(400).json({
        success: false,
        error: 'Format invalide. Utilisez +228XXXXXXXX'
      });
    }

    // ✅ Créer client Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    console.log('📤 Envoi SMS OTP vers:', phoneNumber);

    // 📤 ENVOYER SMS via Twilio Verify
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications
      .create({
        to: phoneNumber,
        channel: 'sms'
      });

    console.log('✅ SMS envoyé, status:', verification.status);

    // ✅ Succès
    return res.status(200).json({
      success: true,
      message: 'SMS envoyé avec succès',
      status: verification.status
    });

  } catch (error) {
    console.error('❌ Erreur Twilio:', error.message);

    // ❌ Erreur
    return res.status(500).json({
      success: false,
      error: error.message || 'Erreur envoi SMS'
    });
  }
};