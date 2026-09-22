# SamLog Technologies Website

A static organization website for SamLog Technologies, with a homepage and a structured library of 600 generated field resources.

## How the 600 pages work

The library is generated in `script.js` from three dimensions:

- 10 topic categories
- 10 audience groups
- 6 operating environments

That produces 600 unique resource URLs in the form `index.html?page=resource-slug`. Each resource combines topic-specific goals and signals, audience-specific operating context, and environment-specific constraints. It includes a unique title, summary, metadata, working framework, decision questions, first experiment, field checklist and related-resource link. The homepage includes search and progressive loading across the full collection.

This is a client-rendered static experience. It is easy to deploy, but the 600 resources are not separate crawlable HTML files. For search-engine indexing or a Microsoft Store/partner review that requires independent URLs, add a build step that prerenders the resource data into static files or move the content model into a CMS.

The startup application brief is available at `index.html?page=azure-application`. It explains the problem, proposed product, Azure architecture, 12-month milestones and a percentage-based credit allocation. Replace the evidence placeholder with real incorporation, founder, discovery, pilot and traction details before submitting.

## Deploy

1. Upload the contents of this folder to a GitHub repository.
2. In Vercel, choose **Add New > Project** and import the repository.
3. No framework/build command is required. Deploy as a static site.

## Before publishing

- Replace `hello@geolog.example` with a real organization email.
- Confirm the organization name, address, ownership and contact details.
- Add privacy, accessibility, cookie and legal pages appropriate to the organization and jurisdiction.
- Keep product, customer, certification and impact claims accurate. No website can guarantee approval by Microsoft or another reviewer; publishing complete, verifiable organization information is essential.
