<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
	<xsl:output method="html" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html lang="en">
			<head>
				<title><xsl:value-of select="/rss/channel/title"/> | RSS Feed</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<style>
					:root {
						--bg: #0e0a06;
						--surface: #18120c;
						--hair: rgba(245, 236, 217, 0.12);
						--text: #f5ecd9;
						--muted: #a8967b;
						--faint: #6e6048;
						--accent: #d4a247;
					}
					* { box-sizing: border-box; }
					html, body {
						margin: 0;
						padding: 0;
						background: var(--bg);
						color: var(--text);
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
						line-height: 1.55;
					}
					.wrap {
						max-width: 720px;
						margin: 0 auto;
						padding: 2.5rem 1.25rem 4rem;
					}
					.banner {
						background: var(--accent);
						color: var(--bg);
						padding: 0.6rem 1rem;
						margin: -2.5rem -1.25rem 2.5rem;
						font-size: 0.78rem;
						letter-spacing: 0.06em;
					}
					@media (min-width: 720px) {
						.banner {
							margin-left: -1.25rem;
							margin-right: -1.25rem;
						}
					}
					.eyebrow {
						font-size: 0.72rem;
						letter-spacing: 0.2em;
						text-transform: uppercase;
						color: var(--accent);
						margin: 0 0 0.8rem;
					}
					h1 {
						font-family: Georgia, serif;
						font-size: clamp(2rem, 5vw, 3rem);
						margin: 0 0 0.8rem;
						line-height: 1.1;
					}
					.feed-desc {
						color: var(--muted);
						margin: 0 0 2rem;
						font-size: 1.05rem;
					}
					.feed-meta {
						font-size: 0.78rem;
						color: var(--faint);
						padding: 1rem 0;
						margin-bottom: 2rem;
						border-top: 1px solid var(--hair);
						border-bottom: 1px solid var(--hair);
					}
					.feed-meta code {
						color: var(--accent);
						background: var(--surface);
						padding: 0.15em 0.5em;
						border: 1px solid var(--hair);
					}
					.item {
						padding: 1.5rem 0;
						border-bottom: 1px solid var(--hair);
					}
					.item h2 {
						font-family: Georgia, serif;
						font-size: 1.4rem;
						margin: 0 0 0.4rem;
						line-height: 1.25;
					}
					.item h2 a {
						color: var(--text);
						text-decoration: none;
					}
					.item h2 a:hover {
						color: var(--accent);
					}
					.item-meta {
						font-size: 0.78rem;
						color: var(--faint);
						margin: 0 0 0.6rem;
					}
					.item-desc {
						color: var(--muted);
						margin: 0;
					}
					a {
						color: var(--accent);
					}
				</style>
			</head>
			<body>
				<div class="wrap">
					<div class="banner">
						This is an RSS feed. Copy this page's URL into an RSS reader (Feedly, NetNewsWire, Inoreader) to subscribe.
					</div>
					<p class="eyebrow">RSS Feed</p>
					<h1><xsl:value-of select="/rss/channel/title"/></h1>
					<p class="feed-desc"><xsl:value-of select="/rss/channel/description"/></p>
					<div class="feed-meta">
						Site: <a href="{/rss/channel/link}"><xsl:value-of select="/rss/channel/link"/></a>
					</div>
					<xsl:for-each select="/rss/channel/item">
						<article class="item">
							<h2>
								<a href="{link}"><xsl:value-of select="title"/></a>
							</h2>
							<p class="item-meta"><xsl:value-of select="pubDate"/></p>
							<p class="item-desc"><xsl:value-of select="description"/></p>
						</article>
					</xsl:for-each>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
