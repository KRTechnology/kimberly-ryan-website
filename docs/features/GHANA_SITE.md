# Kimberly Ryan Ghana site

The Ghana landing page is built from the draft in
`Kimberly Ryan Ghana_ Home page draft.pdf` and served as the homepage of
**ghana.kimberly-ryan.com**.

## How it is wired

| Piece | Purpose |
| --- | --- |
| `app/(ghana)/ghana/page.tsx` | The Ghana homepage (URL: `/ghana`). |
| `components/ghana/*` | Ghana-specific header, sections and contact form. |
| `components/layout/footer.tsx` | The main site's footer, reused verbatim on the Ghana page. |
| `app/api/ghana-contact/route.ts` | Saves enquiries to the existing Sanity `contactSubmission` dataset and sends the existing Resend notification. |
| `middleware.ts` | Rewrites `ghana.kimberly-ryan.com/*` to `/ghana/*` and redirects the main domain's `/ghana` URL to the Ghana domain. |

The Ghana page has its own header and sections, so they can evolve
independently, but it renders the main site's footer so both domains end the
same way. The footer is passed `linkBase={MAIN_SITE_URL}` because links such as
`/services/outsourcing` or `/privacy-policy` would otherwise be rewritten to
`/ghana/*` by `middleware.ts` and 404 on the subdomain. It also shares the root
layout (fonts, analytics) and the global Tailwind configuration.

## Design

The page follows the main site's palette so the two do not look like different
brands. Stick to these values:

| Role | Value |
| --- | --- |
| Page background | `#FFFFFF` |
| Card / subtle fill | `#FAFAFA` |
| Section band and hairlines | `#EDECEB` |
| Borders | `#D5D7DA` |
| Headings | `#181D27` |
| Body text | `#535862` |
| Accent (buttons, links, quote mark) | `#EB821D`, hover `#B56314` |
| Dark blocks | `#373433`; footer `#181716` |

Avoid the cream and brown tints the first draft used (`#FCF9F4`, `#FBF7F1`,
`#A85A12`, `#1B0E03`). Accent colour is for buttons, links and small
highlights only; labels and body copy stay grey.

## Local preview

```bash
npm run dev
```

- Ghana page: http://localhost:3000/ghana
- Main site: http://localhost:3000/

To test the host-based rewrite locally, add an entry to your hosts file:

```
127.0.0.1 ghana.localhost
```

Then open http://ghana.localhost:3000. `ghana.localhost` is included in the
default Ghana host list in `middleware.ts`.

## Domain setup (Vercel + Cloudflare)

1. In the Vercel project, go to **Settings → Domains** and add
   `ghana.kimberly-ryan.com`.
2. In Cloudflare, open **DNS → Records** and add:

   | Type | Name | Target | Proxy status | TTL |
   | --- | --- | --- | --- | --- |
   | CNAME | `ghana` | `cname.vercel-dns.com` | **DNS only** (grey cloud) | Auto |

   Use the exact target Vercel shows for the domain if it differs. Turn the
   Cloudflare proxy **off** (grey cloud); proxying Vercel through Cloudflare can
   break domain verification, certificate issuance and redirects.
3. Do not add an `A`, `AAAA` or second `CNAME` for `ghana` — it must not
   conflict with this record.
4. Wait for Vercel to verify the domain and issue its certificate (usually a
   few minutes; DNS propagation can take longer).
5. No extra Vercel project is needed — the same deployment serves both domains.
6. Optional: set `GHANA_HOSTS` in the project environment variables to a
   comma-separated list of additional hosts that should serve the Ghana page
   (for example a staging domain). The default is
   `ghana.kimberly-ryan.com,www.ghana.kimberly-ryan.com,ghana.localhost`.
7. Optional: to support `www.ghana.kimberly-ryan.com`, add that domain in Vercel
   and a second `CNAME` with name `www.ghana` pointing to
   `cname.vercel-dns.com`, or create a Cloudflare Redirect Rule from
   `www.ghana.kimberly-ryan.com` to `ghana.kimberly-ryan.com`.

## Content to confirm before launch

These items came from the draft and are intentionally marked as placeholders:

- **Client logos** — five tiles in `components/ghana/ghana-trust.tsx` are
  labelled “Client logo”. Replace them with approved Ghana client logos.
- **Testimonial** — the quote in `ghana-trust.tsx` is placeholder copy with a
  “To be confirmed” label. Add an approved quote, name, role and company.
- **Photos** — the hero and “Why us” images are existing Kimberly Ryan stock
  photos. Swap in approved photos of the Ghana team when available.
- **Email address** — `info@kimberly-ryan.com` is used as the Ghana contact
  address. Change `GHANA_EMAIL` in `components/ghana/constants.ts` if Ghana
  has a dedicated inbox.
- **CV link** — “Submit your CV” points to `https://www.kracada.com/jobs`
  (the careers destination used by the main site).
- **Office address** — the Accra address has been removed from the page at the
  client's request, together with the hero address card, the map embed, the
  “Accra office / Airport West” stat and the JSON-LD `PostalAddress`. If a
  public address is confirmed, add it back to `components/ghana/constants.ts`,
  `ghana-hero.tsx`, `ghana-contact.tsx` and the schema in
  `app/(ghana)/ghana/page.tsx`.

## Enquiries

The contact form posts to `/api/ghana-contact`. It requires the same
environment variables as the main contact form:

```
SANITY_API_TOKEN=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
MARKETING_EMAIL=...
```

Company names are included at the top of the message stored in Sanity because
the existing `contactSubmission` schema has no separate company field. If you
add a `company` field to the schema, update
`app/api/ghana-contact/route.ts` to store it directly.
