import { Fragment } from "react";
import Link from "next/link";

// Renders Strapi "Blocks" rich text with the legal pages' own classes:
// paragraph -> .legal-body-text, heading -> .legal-subtitle, list ->
// .legal-list, quote -> .legal-callout-box. Unknown block types are skipped,
// so a newer editor feature never breaks the page.

const LINK_STYLE = { color: "#d99b00", textDecoration: "underline", fontWeight: 600 };

function Text({ node }) {
    let out = node.text ?? "";
    if (node.code) out = <code>{out}</code>;
    if (node.strikethrough) out = <s>{out}</s>;
    if (node.underline) out = <u>{out}</u>;
    if (node.italic) out = <em>{out}</em>;
    if (node.bold) out = <strong>{out}</strong>;
    return out;
}

function Inline({ nodes }) {
    return (Array.isArray(nodes) ? nodes : []).map((node, i) => {
        if (node?.type === "link" && typeof node.url === "string") {
            const children = <Inline nodes={node.children} />;
            if (node.url.startsWith("/") && !node.url.startsWith("//")) {
                return <Link key={i} href={node.url} style={LINK_STYLE}>{children}</Link>;
            }
            const external = /^https?:\/\//.test(node.url);
            return (
                <a key={i} href={node.url} style={LINK_STYLE} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {children}
                </a>
            );
        }
        if (node?.type === "text") return <Fragment key={i}><Text node={node} /></Fragment>;
        return null;
    });
}

const OUTLINED_CALLOUT = { background: "#ffffff", border: "1px solid #e2ded5", borderLeft: "4px solid #f5c542" };

export default function LegalBlocks({ blocks, calloutStyle = "filled" }) {
    return (Array.isArray(blocks) ? blocks : []).map((block, i) => {
        switch (block?.type) {
            case "paragraph":
                return <p key={i} className="legal-body-text"><Inline nodes={block.children} /></p>;
            case "heading": {
                // Section headings are h2 (from the section's Heading field); body headings start at h3.
                const Tag = `h${Math.min(6, Math.max(3, block.level || 3))}`;
                return <Tag key={i} className="legal-subtitle"><Inline nodes={block.children} /></Tag>;
            }
            case "list": {
                const Tag = block.format === "ordered" ? "ol" : "ul";
                return (
                    <Tag key={i} className="legal-list">
                        {(block.children || []).map((item, j) => (
                            <li key={j} className="legal-list-item"><Inline nodes={item?.children} /></li>
                        ))}
                    </Tag>
                );
            }
            case "quote":
                return calloutStyle === "outlined" ? (
                    <div key={i} className="legal-callout-box" style={OUTLINED_CALLOUT}>
                        <p className="legal-body-text" style={{ marginBottom: "14px" }}><Inline nodes={block.children} /></p>
                    </div>
                ) : (
                    <div key={i} className="legal-callout-box">
                        <p><Inline nodes={block.children} /></p>
                    </div>
                );
            default:
                return null;
        }
    });
}
