// src/pages/ArticlePage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../Components/Button";
import { fetchArticleBySlug } from "../services/ArticleService";

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const res = await fetchArticleBySlug(slug);
        const data = res.data?.article;

        // Treat inactive or non-published articles as not found for viewers
        if (!data || !data.isActive || data.status !== "published") {
          setNotFound(true);
        } else {
          setArticle(data);
        }
      } catch (err) {
        console.error("Failed to load article:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadArticle();
  }, [slug]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <section className="px-12 lg:px-24 py-12 border-b-[1.5px] border-[#c5d0c5]">
          <div className="max-w-[800px] mx-auto">
            <div className="h-9 w-32 bg-[#e8ebe3] rounded-lg mb-6" />
            <div className="h-3 w-40 bg-[#e8ebe3] rounded mb-3" />
            <div className="h-8 w-3/4 bg-[#e8ebe3] rounded mb-3" />
            <div className="h-8 w-1/2 bg-[#e8ebe3] rounded mb-6" />
            <div className="flex gap-4">
              <div className="h-3 w-20 bg-[#e8ebe3] rounded" />
              <div className="h-3 w-4 bg-[#e8ebe3] rounded" />
              <div className="h-3 w-24 bg-[#e8ebe3] rounded" />
            </div>
          </div>
        </section>
        <section className="px-12 lg:px-24 py-12">
          <div className="max-w-[800px] mx-auto">
            <div className="aspect-video rounded-2xl bg-[#e8ebe3] mb-8" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 bg-[#e8ebe3] rounded w-full" />
              ))}
              <div className="h-4 bg-[#e8ebe3] rounded w-2/3" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 404 - Article Not Found
  if (notFound || !article) {
    return (
      <div className="w-full">
        <section className="px-12 lg:px-24 py-16 border-b-[1.5px] border-[#c5d0c5]">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-[32px] font-light text-[#2a3a2a] mb-4">
              Article not found
            </h1>
            <p className="text-[14px] text-[#6a7a6a] mb-2">
              The link you followed to get here must be broken...
            </p>
            <p className="text-[13px] text-[#8a9a8a] mb-8">
              The page you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/articles">
                <Button variant="primary">Back to Articles</Button>
              </Link>
              <Link to="/">
                <Button variant="secondary">Back Home</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const formattedSlug = article.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="w-full">
      {/* Article Header */}
      <section className="px-12 lg:px-24 py-12 border-b-[1.5px] border-[#c5d0c5]">
        <div className="max-w-[800px] mx-auto">
          <Link to="/articles" className="inline-block mb-6">
            <Button variant="secondary" className="text-[10px]">
              ← Back to Articles
            </Button>
          </Link>

          <p className="text-[11px] tracking-[0.12em] uppercase text-[#8a9a8a] mb-3">
            {formattedSlug}
          </p>
          <h1 className="text-[28px] lg:text-[36px] font-light text-[#2a3a2a] leading-[1.2] mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-[12px] text-[#8a9a8a]">
            <span>Flores Studio</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-12 lg:px-24 py-12">
        <div className="max-w-[800px] mx-auto">
          {/* Featured Image */}
          {article.image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-[#e8ebe3]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<div class="w-full h-full flex items-center justify-center"><div class="w-16 h-16 rounded-xl bg-[#c5d0c5] flex items-center justify-center"><div class="w-6 h-6 bg-[#f8f9f5] rounded-sm"></div></div></div>';
                }}
              />
            </div>
          )}

          {/* Preview / Lead paragraph */}
          {article.preview && (
            <p className="text-[16px] leading-[1.8] text-[#2a3a2a] font-medium mb-6 whitespace-pre-wrap">
              {article.preview}
            </p>
          )}

          {/* Main paragraph */}
          {article.paragraph && (
            <div className="space-y-6">
              {article.paragraph.split("\n\n").map((block, index) => (
                <p
                  key={index}
                  className="text-[15px] leading-[1.8] text-[#4a5a4a] whitespace-pre-wrap"
                >
                  {block}
                </p>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-[1.5px] border-[#c5d0c5]">
            <Link to="/articles">
              <Button variant="secondary">← Back to Articles</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
