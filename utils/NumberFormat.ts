export function formatLikes(likes: number): string | null {
  if (!likes) return null;
  if (likes >= 1_000_000) {
    return (likes / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (likes >= 1_000) {
    return (likes / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return likes.toString();
}
