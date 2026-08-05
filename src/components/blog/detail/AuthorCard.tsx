import type { BlogPostAuthor } from "@/types/blog";
import { BlogAuthorRow } from "../BlogAuthorRow";

type AuthorCardProps = {
  author: BlogPostAuthor;
};

/** Sidebar author row — no background/card treatment (removed per request);
 * just the same avatar+name+meta row used by the index page's cards
 * (meta = role here, instead of read time). */
export function AuthorCard({ author }: AuthorCardProps) {
  return <BlogAuthorRow author={author} meta={author.role} />;
}
