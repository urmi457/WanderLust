import useApiList from "../hooks/useApiList";
import { BlogsAPI } from "../lib/api";
import { blogs as fallbackBlogs } from "../data/blogs";
import BlogCard from "./BlogCard";

// "Popular Travel Blogs" / "Our Blog" grid, reused on Home and Blog pages.
export default function BlogSection({ limit, title = "Popular Travel Blogs" }) {
  const { data: blogs, loading } = useApiList(BlogsAPI.list, fallbackBlogs);
  const list = limit ? blogs.slice(0, limit) : blogs;

  return (
    <section className="section-pad">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow justify-center">Our Blog</span>
          <h2 className="section-title">{title}</h2>
        </div>

        {loading ? (
          <p className="text-center text-base-content/50">Loading posts...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((post) => (
              <BlogCard key={post._id || post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
