import LegalPage from '../../components/Legal/LegalPage.jsx';
import { PRIVACY_POLICY } from '../../components/Legal/legalContent';
import { getLegalPage } from '../../lib/strapi';
import { mergeLegalPage, legalMetadata } from '../../lib/legal';

// Rendered per request so edits published in Strapi show up immediately.
// If Strapi is unreachable the page shows its built-in copy.
export const dynamic = 'force-dynamic';

async function loadPage() {
  return mergeLegalPage(await getLegalPage('privacy-policy'), PRIVACY_POLICY);
}

export async function generateMetadata() {
  return legalMetadata(await loadPage());
}

export default async function PrivacyPolicyPage() {
  return <LegalPage page={await loadPage()} />;
}
