import Link from "next/link";
export default function BlogNumberSection({ label, title, description, buttonLabel, buttonHref }) {
    return (
        <section className="blog-number-section">
            <div className="container">
                <div className="blog-number-inner">
                    <div className="blog-number-content">
                        <div className="blog-number-label">
                            <span className="arr"><i className="fa fa-long-arrow-right"></i></span> {label}
                        </div>
                        <h2 className="blog-number-title">
                            {title}
                        </h2>
                        <p className="blog-number-description">
                            {description}
                        </p>
                    </div>
                    <div className="blog-number-btm-area">
                        <Link
                            href={buttonHref}
                            className="blog-number-button"
                        >
                            <span>{buttonLabel}</span>
                           <span className="button-arrow"><i className="fa fa-long-arrow-right"></i></span>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}