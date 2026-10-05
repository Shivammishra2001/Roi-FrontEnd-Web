import LegalPage from '../../components/Legal/LegalPage.jsx';
import { PRIVACY_POLICY } from '../../components/Legal/legalContent';
import { notFound } from 'next/navigation';
import { getLegalPage, LEGAL_NOT_PUBLISHED } from '../../lib/strapi';
import { mergeLegalPage, legalMetadata } from '../../lib/legal';

// Rendered per request so edits published in Strapi show up immediately.
// If Strapi is unreachable the page shows its built-in copy; if the page is
// unpublished (a draft) in Strapi, it's a 404.
export const dynamic = 'force-dynamic';

async function loadPage() {
  const cms = await getLegalPage('privacy-policy');
  if (cms === LEGAL_NOT_PUBLISHED) notFound();
  return mergeLegalPage(cms, PRIVACY_POLICY);
}

export async function generateMetadata() {
  return legalMetadata(await loadPage());
}

export default async function PrivacyPolicyPage() {
  return <LegalPage page={await loadPage()} />;
}
