import {
	collection,
	getDocs,
	query,
	orderBy,
	where,
	limit as firestoreLimit,
	type QueryConstraint
} from 'firebase/firestore';
import { getDb } from './client';
import type { Article, ArticleCategory } from '$lib/types';

const COLLECTION_NAME = 'articles';

/**
 * Fetch all articles, newest first.
 */
export async function fetchArticles(): Promise<Article[]> {
	const db = getDb();
	const articlesQuery = query(collection(db, COLLECTION_NAME), orderBy('publishedAt', 'desc'));
	const snapshot = await getDocs(articlesQuery);
	return snapshot.docs.map((doc) => doc.data() as Article);
}

/**
 * Fetch the N most recent articles, optionally filtered by category.
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
	return snapshot.docs.map((doc) => doc.data() as Article);
}
