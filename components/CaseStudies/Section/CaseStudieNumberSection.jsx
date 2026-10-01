import Link from "next/link";
export default function BlogNumberSection() {
    return (
        <section className="blog-number-section">
            <div className="container">
                <div className="blog-number-inner">
                    <div className="blog-number-content">
                        <div className="blog-number-label">
                            <span className="arr"><i className="fa fa-long-arrow-right"></i></span> NEXT
                        </div>
                        <h2 className="blog-number-title">
                            Have a number that needs moving?
                        </h2>
                        <p className="blog-number-description">
                            Tell us the metric. We will come back with a plan,
                            not a pitch deck.
                        </p>
                    </div>
                    <div className="blog-number-btm-area">
                        <Link
                            href="/contact"
                            className="blog-number-button"
                        >
                            <span>Start a conversation</span>
                           <span className="button-arrow"><i className="fa fa-long-arrow-right"></i></span>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}