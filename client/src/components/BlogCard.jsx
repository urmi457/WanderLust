import { FiCalendar } from "react-icons/fi";

// Single blog post preview card used in "Popular Travel Blogs" / "Our Blog".
export default function BlogCard({ post }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition overflow-hidden border border-base-300">
      <figure className="h-40 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </figure>
      <div className="card-body p-5">
        <span className="flex items-center gap-1 text-xs text-base-content/50">
          <FiCalendar size={12} /> {post.date}
        </span>
        <h3 className="card-title text-primary font-display text-base">{post.title}</h3>
        <p className="text-sm text-base-content/60 line-clamp-2">{post.excerpt}</p>
        <button className="btn-brand btn-sm mt-3 w-fit">Read More</button>
      </div>
    </div>
  );
}
