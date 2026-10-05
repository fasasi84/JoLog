# JoLog Technologies Website

A static startup website for JoLog Technologies. The homepage presents the early-stage product direction, customer problem, business-model hypothesis and validation plan. The dashboard graphic is an illustrative concept, not a live product or customer deployment.

An interactive product demo is available at `index.html?page=demo`. It uses fictional in-browser sample data; edits are not saved to a server and reset on reload. It is a product walkthrough, not an account-backed trial.

## How the 600 pages work

The experimental field-reference routes are generated in `script.js` from three dimensions:

- 10 topic categories
- 10 audience groups
- 6 operating environments

That produces 600 client-rendered route combinations in the form `index.html?page=resource-slug`. These generated combinations are not 600 separately researched or published guides, and are not presented as company traction on the homepage.

This is a client-rendered static experience. The generated routes are not separate crawlable HTML files. For search-engine indexing or a review that requires independent URLs, add a build step that prerenders the resource data into static files or move the content model into a CMS.

## Deploy

1. Upload the contents of this folder to a GitHub repository.
2. In Vercel, choose **Add New > Project** and import the repository.
3. No framework/build command is required. Deploy as a static site.

## Before publishing

- Replace `hello@jolog.example` with a real organization email.
- Confirm the organization name, address, ownership and contact details.
- Add privacy, accessibility, cookie and legal pages appropriate to the organization and jurisdiction.
- Keep product, customer, certification and impact claims accurate. No website can guarantee approval by Microsoft or another reviewer; publishing complete, verifiable organization information is essential.
