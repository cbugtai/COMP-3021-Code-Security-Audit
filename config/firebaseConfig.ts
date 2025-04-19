import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";


const serviceAccountJSON: string | undefined = process.env.FIREBASE_KEY;

if (!serviceAccountJSON){
    throw new Error("FIREBASE_KEY env var is not met")
}
const serviceAccount: ServiceAccount = JSON.parse(serviceAccountJSON)

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();

const db: Firestore = getFirestore();

export { auth, db };