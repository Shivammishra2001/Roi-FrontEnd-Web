// Built-in copy of the two legal pages, in the shape Strapi returns for the
// `privacy-policy` and `terms-and-condition` single types (section bodies in
// Strapi "Blocks" rich-text format).
//
// Used as the fallback when Strapi is unreachable or a field is empty, and
// exported to the backend's data/legal-pages/ snapshot that seeds the CMS
// (`npm run seed:legal`). Edit the live copy in Strapi, not here.

// --- Blocks helpers -------------------------------------------------------
const t = (text, marks = {}) => ({ type: 'text', text, ...marks });
const inline = (parts) => parts.map((part) => (typeof part === 'string' ? t(part) : part));
const p = (...parts) => ({ type: 'paragraph', children: inline(parts) });
const h3 = (text) => ({ type: 'heading', level: 3, children: [t(text)] });
const ul = (...items) => ({
    type: 'list',
    format: 'unordered',
    children: items.map((item) => ({ type: 'list-item', children: [t(item)] })),
});
const quote = (...parts) => ({ type: 'quote', children: inline(parts) });
const link = (url, text) => ({ type: 'link', url, children: [t(text)] });
const bold = (text) => t(text, { bold: true });

const section = (anchorId, navTitle, heading, content, calloutStyle = 'filled') => ({
    anchorId,
    navTitle,
    heading,
    calloutStyle,
    content,
});

// --- Privacy Policy ---------------------------------------------------------
export const PRIVACY_POLICY = {
    title: 'Privacy Policy',
    badge: 'LEGAL & PRIVACY COMPLIANCE',
    heroDescription:
        'ROI Mantra understands the privacy and security concerns you may have about your personal information. Acknowledging the sensitivity, we leave no stone unturned to protect your data from all sorts of risks, and make sure it is used in compliance with the law.',
    effectiveDate: '2026-10-01',
    lastUpdated: '2026-10-01',
    helpCard: {
        title: 'Privacy Assistance',
        text: 'Have concerns or wish to learn more about how your data is handled?',
        email: 'info@roimantra.com',
        phone: '+91 9650095232',
        buttonLabel: 'Contact Us Form',
        buttonHref: '/contact',
    },
    sections: [
        section('intro', 'Introduction & PII Overview', 'Privacy Overview', [
            p(
                'ROI Mantra understands the privacy and security concerns you may have about your personal information. Acknowledging the sensitivity, we leave no stone unturned to protect your data from all sorts of risks, and make sure it is used in compliance with the law. This privacy policy has been compiled to better serve those who are concerned with how their ‘Personally Identifiable Information’ (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context.'
            ),
            p(
                'Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.'
            ),
        ]),
        section('how-we-collect', 'How We Collect Information', 'How We Collect Information', [
            h3('(a) Log Files'),
            p(
                "Like many other Web sites, our site makes use of log files. The information inside the log files includes internet protocol ( IP ) addresses, type of browser, Internet Service Provider ( ISP ), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user's movement around the site, and gather demographic information. IP addresses, and other such information are not linked to any information that is personally identifiable."
            ),
            h3('(b) Cookies and Web Beacons'),
            p(
                "We use cookies to store information about visitors' preferences, record user-specific information on which pages the user access or visit, customize Web page content based on visitors browser type or other information that the visitor sends via their browser."
            ),
        ]),
        section('how-we-use', 'How We Use Your Information', 'How We Use Your Information', [
            p(
                'We may use the information we collect from you when you fill out a form or sign up for our newsletter, respond to a survey or marketing communication in the following ways:'
            ),
            ul(
                'To allow us to better service you in responding to your requests.',
                'To send periodic emails regarding our services and vital updates.'
            ),
            quote(
                bold('NOTE:'),
                ' We do not sell, misuse or distribute your data for any purpose, unless required by law or as authorized by you or your signatory. We are obligated to share your information in case it is required by law or when required by law-enforcement or government officials.'
            ),
        ]),
        section('how-we-protect', 'How We Protect Your Information', 'How We Protect Your Information', [
            p(
                'We maintain strict technical, administrative, and physical safeguards to protect your personal information against loss, misuse, or unauthorized access. We train our employees to maintain appropriate standards of conduct with regard to the protection of information. We also take the necessary steps to require that third parties who assist in our provision of services follow our privacy practices and comply with data protection laws.'
            ),
            p(
                "Our data Privacy Policy is protected by Industry endorsed technology and widely deployed security protocol used in today's cut-throat market scenarios. Bringing such advanced and stringent security protocol into the practice ensures you a safe transmission of collected data."
            ),
        ]),
        section('third-party-links', 'Third Party Links', 'Third Party Links', [
            p(
                'Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.'
            ),
        ]),
        section('policy-changes', 'Policy Changes', 'Policy Changes', [
            p(
                'These policies may be amended by us at any time and without notice, but will be posted on this page. You agree that your continued use of our websites, product or service after that date will constitute your consent and acceptance of the amendment.'
            ),
        ]),
        section('disclaimer', 'Security & Legal Disclaimer', 'Disclaimer', [
            p(
                'Information shared over the Internet is subject to several security perils. Therefore, in the case of any losses/damage, alteration or deletion, incidental or consequential or any malfunction in the system due to unlawful use or access, ROI Mantra holds no responsibilities for any such consequences.'
            ),
        ]),
        section(
            'contact-us',
            'Contact & Further Inquiries',
            'Contact & Further Inquiries',
            [
                quote(
                    'If you wish to learn more about our Privacy Policy, fill out our ',
                    link('/contact', 'contact form'),
                    ' or simply call ',
                    link('tel:+911204663004', '+91-120-466-3004'),
                    '. You can also write to us at ',
                    link('mailto:sales@roimantra.com', 'sales@roimantra.com'),
                    '.'
                ),
            ],
            'outlined'
        ),
    ],
    seo: {
        metaTitle: 'Privacy Policy | ROI Mantra',
        metaDescription:
            'Learn how ROI Mantra collects, protects, and manages your personal information and data privacy.',
    },
};

// --- Terms & Conditions -----------------------------------------------------
export const TERMS_AND_CONDITIONS = {
    title: 'Terms & Conditions',
    badge: 'TERMS OF SERVICE & ENGAGEMENT',
    heroDescription:
        'Please review our terms of engagement, billing structure, cancellation policies, and legal stipulations governing the purchase and provision of ROI Mantra, Inc. services.',
    effectiveDate: '2026-10-01',
    lastUpdated: '2026-10-01',
    helpCard: {
        title: 'Billing & Legal Support',
        text: 'Have inquiries regarding onboarding charges, invoice payments, or service terms?',
        email: 'info@roimantra.com',
        phone: '+91 9650095232',
        buttonLabel: 'Contact Us',
        buttonHref: '/contact',
    },
    sections: [
        section('charges', 'Charges', 'Charges:', [
            p(
                'In order for onboarding to occur, first month charges must be paid. Charges are outlined in your proposal at a monthly rate. Recurring payments are an option to be billed monthly, or at greater time increments, depending on customer preference. Customer is generally billed on the first of the month, excluding invoices for the first month of services, which are to be pro-rated according to their official onboarding date.'
            ),
        ]),
        section('agreement-term', 'Agreement Term & Refunds', 'Agreement Term, Cancellation and Refunds:', [
            p(
                "Customers have agreed to pay the amount agreed upon on their customized proposal, at the beginning of each month that services are to be rendered. Services come only in monthly increments. Except for the 30 day Money back Guarantee for the 1st month of mangement fee, ROI Mantra, Inc. will not issue refunds for services already rendered. A customer may cancel their service at any time, but agrees to provide ROI Mantra, Inc. with at least 10 days' advance notice before the end of the current month, in order to avoid future charges."
            ),
        ]),
        section('no-liability', 'No Liability', 'No Liability:', [
            p(
                'ROI Mantra, Inc., its suppliers, affiliates, officers, directors, employees, subsidiaries, and assigns, shall not be liable for any damages whatsoever, including, without limitation, direct or indirect damages for loss of business profit, personal injuries, business interruptions, state licensing requirements, city ordinances, business information loss, or any other loss. The maximum liability shall be limited to the amount actually paid for the services provided.'
            ),
        ]),
        section('billing', 'Billing & Remittance', 'Billing:', [
            p(
                "Customers may pay invoices via credit card remittance to ROI Mantra, Inc.'s payment portal on ",
                link('https://www.roimantra.com/pay', 'www.roimantra.com/pay'),
                ', ACH remittance, wire remittance, recurring bank draft payments, or check remittance to 8330 LBJ Fwy Ste. 370, Dallas, TX 75243.'
            ),
        ]),
        section('cancellation', 'Cancellation of Services', 'Cancellation of Services:', [
            p(
                "If customer wishes to cancel their service, they must request to cancel service by sending an email or calling ROI Mantra, Inc. with at least a 30 days' advanced notice of the following month. However, to complete the cancellation process, customer must receive a cancellation acknowledgement in writing to prevent services from being performed past the cancelation month."
            ),
        ]),
        section('communication', 'Communication', 'Communication:', [
            p(
                'The customer agrees to be supportive of their digital marketing campaign and agrees to be responsive to ROI Mantra, Inc. requests in a reasonable period of time, and acknowledges if they are not, it may affect performance with no altering of service costs.'
            ),
        ]),
        section('terms-conditions', 'Terms and Conditions', 'Terms and Conditions:', [
            p(
                'ROI Mantra, Inc. may change its terms and conditions without prior notice, at its sole discretion. To document your terms and conditions for your service, we recommend that you print these terms and conditions and store them in a file or electronically.'
            ),
        ]),
        section('governing-law', 'Governing Law and Venue', 'Governing Law and Venue:', [
            p(
                "By purchasing ROI Mantra, Inc.'s service you agree that your agreement shall be governed by the laws of the State of Texas. You also agree and hereby submit to the jurisdiction and venue of the State of Texas, County of Dallas, with respect to any such matters relating to your purchase of ROI Mantra, Inc.'s services."
            ),
        ]),
    ],
    seo: {
        metaTitle: 'Terms & Conditions | ROI Mantra',
        metaDescription:
            'Read the terms, rules, and conditions governing the use of ROI Mantra website and professional services.',
    },
};
