import type { Favorite, Organization, Post, User } from "@prisma/client";

import { withPublicImageFallback } from "@/lib/demoMediaUrl";

export type UserWithOrgAndFavoritePosts = User & {
  organization: Organization;
  favorites: (Favorite & { post: Post })[];
};

export function mapUserWithDemoMedia(
  user: UserWithOrgAndFavoritePosts,
): UserWithOrgAndFavoritePosts {
  return {
    ...user,
    profileImageUrl: withPublicImageFallback(
      user.profileImageUrl,
      `user-${user.id}`,
    ),
    organization: {
      ...user.organization,
      logoUrl: withPublicImageFallback(
        user.organization.logoUrl,
        `org-${user.organizationId}-logo`,
      ),
      imageUrl: withPublicImageFallback(
        user.organization.imageUrl,
        `org-${user.organizationId}-hero`,
      ),
    },
    favorites: user.favorites.map((f) => ({
      ...f,
      post: {
        ...f.post,
        imageUrl: withPublicImageFallback(f.post.imageUrl, `post-${f.postId}`),
      },
    })),
  };
}
