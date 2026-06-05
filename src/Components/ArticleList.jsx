import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { fetchArticles } from "../services/ArticleService";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const res = await fetchArticles();
        const all = res.data?.articles || [];
        // Only show published and active articles to viewers
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

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border-[1.5px] border-[#c5d0c5] p-5 animate-pulse"
          >
            <div className="aspect-[4/3] rounded-xl bg-[#e8ebe3] mb-4" />
            <div className="h-3 bg-[#e8ebe3] rounded mb-2 w-1/3" />
            <div className="h-4 bg-[#e8ebe3] rounded mb-3 w-3/4" />
            <div className="h-3 bg-[#e8ebe3] rounded mb-1 w-full" />
            <div className="h-3 bg-[#e8ebe3] rounded mb-4 w-2/3" />
            <div className="h-9 bg-[#e8ebe3] rounded-lg w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6a7a6a] text-sm">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6a7a6a] text-sm">No articles published yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article._id}
          className="group bg-white rounded-2xl border-[1.5px] border-[#c5d0c5] p-5 flex flex-col hover:border-[#8a9a8a] transition-colors duration-300"
        >
          {/* Article Image */}
          <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#e8ebe3]">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<div class="w-full h-full flex items-center justify-center"><div class="w-10 h-10 rounded-lg bg-[#c5d0c5] flex items-center justify-center"><div class="w-4 h-4 bg-[#f8f9f5] rounded-sm"></div></div></div>';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 rounded-lg bg-[#c5d0c5] flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#f8f9f5] rounded-sm" />
                </div>
              </div>
            )}
          </div>

          {/* Article Number */}
          <p className="text-[10px] tracking-[0.12em] uppercase text-[#8a9a8a] mb-2">
            Article {String(index + 1).padStart(2, "0")}
          </p>

          {/* Title */}
          <h3 className="text-[16px] font-medium text-[#2a3a2a] mb-3 leading-snug line-clamp-2">
            {article.title}
          </h3>

          {/* Preview */}
          <p className="text-[13px] leading-relaxed text-[#6a7a6a] line-clamp-3 flex-grow mb-4">
            {article.preview}
          </p>

          {/* Read More */}
          <Link to={`/articles/${article.slug}`} className="mt-auto">
            <Button variant="secondary" className="w-full">
              Read More
            </Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
