// Generating mongo initial user
db = db.getSiblingDB("currency");

db.users.insertOne({
    "name": "admin",
    "email": "admin@admin.com",
    "password": "$2a$08$civLGklmMSxlTWYimFYcL.UwrzkMSn5Dm3Jd7mIJlEhlmPwa60cW6", //ZKtM7sUb5Lh8hPe
    "role": "admin",
    "isEmailVerified": true,
    "createdAt": new Date(),
    "updatedAt": new Date()
});

