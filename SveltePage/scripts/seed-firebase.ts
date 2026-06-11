/**
 * Seeds the Firestore "articles" collection from articles-seed.ts.
 * Run with: npm run seed
 */
import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { articleSeed } from '../src/lib/data/articles-seed.ts';

config();

const firebaseConfig = {
	apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.PUBLIC_FIREBASE_APP_ID
};

function checkConfig() {
	const missing = Object.entries(firebaseConfig)
		.filter(([, value]) => !value)
		.map(([key]) => key);

	if (missing.length > 0) {
		console.error('Missing Firebase env vars:', missing.join(', '));
		process.exit(1);
	}
}

async function clearCollection(db: ReturnType<typeof getFirestore>, name: string) {
	const snapshot = await getDocs(collection(db, name));
	if (snapshot.empty) return;
	await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));
}

async function seed() {
	checkConfig();

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	await clearCollection(db, 'articles');

	for (const article of articleSeed) {
		await setDoc(doc(db, 'articles', article.id), article);
	}

	console.log(`Seeded ${articleSeed.length} articles.`);
	process.exit(0);
}

seed().catch((error) => {
	console.error(error);
	process.exit(1);
});
