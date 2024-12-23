export const TruncatedFunc = (post, isDescLength, maxLength) => {
  if (!post.description) return 'No description available.';
  if (isDescLength && post.description.length > maxLength) {
    return `${post.description.substring(0, maxLength)}...`;
  }
  return post.description;
};
