/**
 * Blog post body (Strapi rich text) -> consistent article HTML.
 *
 * Newer posts are clean HTML (<p>, <h2>, <ul>...). Most older posts, imported
 * from WordPress, are HTML headings and lists with the paragraphs left as bare
 * text lines between them. Browsers run those lines together into one small,
 * unspaced block, so here every bare text line outside a block element becomes
 * its own <p>, styled like the paragraphs of the newer posts. Text inside
 * block elements (lists, tables, divs...) and existing <p>s are left as they
 * are, so already-clean posts come out unchanged. Empty paragraphs are
 * dropped, and headings get the article heading classes.
 */

// Elements that hold their own text; a bare line inside one is not a paragraph.
const CONTAINERS = ['p', 'ul', 'ol', 'table', 'div', 'blockquote', 'pre', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'dl', 'section', 'iframe'];
const CONTAINER_OPEN = new RegExp(`<(${CONTAINERS.join('|')})\\b[^>]*>`, 'gi');
const CONTAINER_CLOSE = new RegExp(`</(${CONTAINERS.join('|')})\\s*>`, 'gi');
// A block-level tag (opening or closing) or a standalone image/rule.
const BLOCK_TAG = /<\/?(p|ul|ol|li|table|thead|tbody|tfoot|tr|td|th|div|blockquote|pre|figure|figcaption|h[1-6]|hr|dl|dt|dd|section|iframe)\b[^>]*>/i;

const depthChange = (line) => (line.match(CONTAINER_OPEN) || []).length - (line.match(CONTAINER_CLOSE) || []).length;

function wrapBareLines(html) {
    const out = [];
    let depth = 0;
    for (const raw of html.replace(/\r\n?/g, '\n').split('\n')) {
        let line = raw.trim();
        if (!line) continue;
        if (depth === 0) {
            const block = BLOCK_TAG.exec(line);
            if (!block) {
                out.push(`<p>${line}</p>`);
                continue;
            }
            if (block.index > 0) {
                // "Some text <ul>...": the text before the block is a paragraph.
                out.push(`<p>${line.slice(0, block.index).trim()}</p>`);
                line = line.slice(block.index);
            }
        }
        out.push(line);
        depth = Math.max(0, depth + depthChange(line));
    }
    return out.join('\n');
}

const addClass = (tag, className) => (match) => {
    if (new RegExp(`\\b${className}\\b`).test(match)) return match;
    if (/\sclass=["']/i.test(match)) return match.replace(/\sclass=(["'])([^"']*)\1/i, ` class="$2 ${className}"`);
    return match.replace(new RegExp(`^<${tag}`, 'i'), `<${tag} class="${className}"`);
};

export function toArticleHtml(content) {
    if (typeof content !== 'string' || !content.trim()) return '';
    return wrapBareLines(content)
        .replace(/<p\b[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '')
        .replace(/<h2\b[^>]*>/gi, addClass('h2', 'case-content-title'))
        .replace(/<h3\b[^>]*>/gi, addClass('h3', 'case-content-title-h3'));
}
