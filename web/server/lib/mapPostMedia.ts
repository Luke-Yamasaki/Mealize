import { withPublicImageFallback } from "@/lib/demoMediaUrl";

type PostListRow = {
  id: number;
  imageUrl: string;
  organization: {
    id: number;
    name: string;
    logoUrl: string;
    isNonprofit: boolean;
  };
};

export function mapPostListMedia<T extends PostListRow>(rows: T[]): T[] {
  return rows.map((row) => ({
    ...row,
    imageUrl: withPublicImageFallback(row.imageUrl, `post-${row.id}`),
    organization: {
      ...row.organization,
      logoUrl: withPublicImageFallback(
        row.organization.logoUrl,
        `org-${row.organization.id}-logo`,
      ),
    },
  }));
}
