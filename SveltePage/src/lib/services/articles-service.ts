import {
	collection,
	getDocs,
	getDoc,
	query,
	orderBy,
	where,
	limit as firestoreLimit,
	doc,
	setDoc,
	deleteDoc,
	type QueryConstraint
} from 'firebase/firestore';
import { getDb } from './firebase-client';
import type { Article, ArticleCategory } from '$lib/types';

const COLLECTION_NAME = 'articles';

/**
 * Read all articles, newest first.
 */
export async function fetchArticles(): Promise<Article[]> {
	const db = getDb();
	const articlesQuery = query(collection(db, COLLECTION_NAME), orderBy('publishedAt', 'desc'));
	const snapshot = await getDocs(articlesQuery);
	return snapshot.docs.map((d) => d.data() as Article);
}

/**
 * Read a single article by its slug. Returns null if nothing matches.
 * Articles are stored with their slug as the document id, so this is a
 * direct doc lookup rather than a query.
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
	const db = getDb();
	const snapshot = await getDoc(doc(db, COLLECTION_NAME, slug));
	if (!snapshot.exists()) return null;
	return snapshot.data() as Article;
}

/**
 * Read the N most recent articles, optionally filtered by category.
 */
export async function fetchRecentArticles(
	maxResults = 6,
	category?: ArticleCategory
): Promise<Article[]> {
	const db = getDb();
	const constraints: QueryConstraint[] = [];
	if (category) {
		constraints.push(where('category', '==', category));
	}
	constraints.push(orderBy('publishedAt', 'desc'), firestoreLimit(maxResults));
	const recentQuery = query(collection(db, COLLECTION_NAME), ...constraints);
	const snapshot = await getDocs(recentQuery);
	return snapshot.docs.map((d) => d.data() as Article);
}

/**
 * Create a new article. The article's id field becomes its Firestore document id.
 */
export async function createArticle(article: Article): Promise<void> {
	const db = getDb();
	await setDoc(doc(db, COLLECTION_NAME, article.id), article);
}

/**
 * Update an existing article. Replaces the whole document so the caller
 * should pass the full Article shape, not a partial.
 */
export async function updateArticle(article: Article): Promise<void> {
	const db = getDb();
	await setDoc(doc(db, COLLECTION_NAME, article.id), article);
}

/**
 * Delete the article with the given id.
 */
export async function deleteArticle(id: string): Promise<void> {
	const db = getDb();
	await deleteDoc(doc(db, COLLECTION_NAME, id));
}
