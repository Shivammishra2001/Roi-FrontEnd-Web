import LegalPage from '../../components/Legal/LegalPage.jsx';
import { TERMS_AND_CONDITIONS } from '../../components/Legal/legalContent';
import { notFound } from 'next/navigation';
import { getLegalPage, LEGAL_NOT_PUBLISHED } from '../../lib/strapi';
import { mergeLegalPage, legalMetadata } from '../../lib/legal';

// Rendered per request so edits published in Strapi show up immediately.
// If Strapi is unreachable the page shows its built-in copy; if the page is
// unpublished (a draft) in Strapi, it's a 404.
export const dynamic = 'force-dynamic';

async function loadPage() {
  const cms = await getLegalPage('terms-and-conditions');
  if (cms === LEGAL_NOT_PUBLISHED) notFound();
  return mergeLegalPage(cms, TERMS_AND_CONDITIONS);
}

export async function generateMetadata() {
  return legalMetadata(await loadPage());
}

export default async function TermsConditionsPage() {
  return <LegalPage page={await loadPage()} />;
}
