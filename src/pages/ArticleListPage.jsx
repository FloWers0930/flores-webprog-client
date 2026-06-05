// src/pages/ArticleListPage.jsx
import { useState, useEffect } from "react";
import Button from "../Components/Button";
import ArticleList from "../Components/ArticleList";
import { fetchArticles } from "../services/ArticleService";
import { Link } from "react-router-dom";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchArticles();
        const all = res.data?.articles || [];
        // Only show published and active articles
        setArticles(all.filter((a) => a.status === "published" && a.isActive));
      } catch (err) {
        console.error("Failed to load articles:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="px-12 lg:px-24 py-12 border-b-[1.5px] border-[#c5d0c5]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.12em] uppercase text-[#8a9a8a] mb-3">
            Featured Articles
          </p>
          <h1 className="text-[28px] lg:text-[32px] font-light text-[#2a3a2a] leading-[1.2] mb-4">
            Article Collection
          </h1>
          <p className="text-[14px] leading-relaxed text-[#6a7a6a] max-w-xl mb-2">
            Explore our curated selection of React development articles. Each
            piece focuses on essential concepts and practical implementation.
          </p>
          {!loading && !error && (
            <p className="text-[12px] text-[#8a9a8a] mb-6">
              {articles.length} article{articles.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          )}
          {(loading || error) && <div className="mb-6" />}
          <Link to="/">
            <Button variant="secondary">Back Home</Button>
          </Link>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-12 lg:px-24 py-12">
        <div className="max-w-[1400px] mx-auto">
          {error ? (
            <div className="text-center py-16">
              <p className="text-[14px] text-[#6a7a6a] mb-4">{error}</p>
              <Button
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <ArticleList articles={articles} loading={loading} />
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;
