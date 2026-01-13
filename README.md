# BankVI Twilio Backend

Backend Vercel pour gérer l'envoi/vérification SMS OTP avec Twilio.

## Endpoints

- `POST /api/send-otp` - Envoyer SMS OTP
- `POST /api/verify-otp` - Vérifier code OTP

## Variables d'environnement

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_VERIFY_SID`
```

---

## **✅ Checkpoint Étape 2**

Tu dois avoir ces fichiers créés avec le bon contenu :
```
✅ api/send-otp.js       (code complet)
✅ api/verify-otp.js     (code complet)
✅ vercel.json           (config)
✅ .env                  (tes credentials Twilio)
✅ .gitignore            (sécurité)
✅ README.md             (doc)
✅ package.json          (dépendances)