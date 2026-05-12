/**
 * Parses historical Python seed files from git (`main:app/seeds/*.py`) into values
 * suitable for Prisma. Matches the original tuple-style `Organization(...)` /
 * `Post(...)` blocks committed on branch `main`.
 */

export type SeedOrganizationDraft = {
  federalId: string;
  isNonprofit: boolean;
  logoUrl: string;
  imageUrl: string;
  hoursOpen: string;
  hoursClose: string;
  timeslot: string;
  name: string;
  description: string;
  street: string;
  zip: string;
  city: string;
  state: string;
  phone: string;
  email: string;
};

export type SeedPostDraft = {
  isItem: boolean;
  organizationId: number;
  userId: number;
  title: string;
  description: string;
  quantity: string;
  categoryId: number;
  imageUrl: string;
  expDate: string;
  status: number;
};

export function parseOrganizationSeedSource(py: string): SeedOrganizationDraft[] {
  const blocks: SeedOrganizationDraft[] = [];
  const re = /Organization\(\s*([\s\S]*?)\s*\)\s*\n/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(py)) !== null) {
    const body = m[1];
    const get = (field: string) => {
      const mm = body.match(new RegExp(`${field}=['"]([^'"]*)['"]`, "s"));
      return mm ? mm[1] : "";
    };
    let description = "";
    const dm = body.match(/description=(["'])((?:\\.|(?!\1).)*)\1\s*,\s*street=/s);
    if (dm) description = dm[2].replace(/\\n/g, "\n").replace(/\\'/g, "'");
    let name = get("name");
    const nm = body.match(/name=(["'])((?:\\.|(?!\1).)*)\1\s*,\s*description=/s);
    if (nm) name = nm[2].replace(/\\'/g, "'");
    const fed = get("federalId");
    if (!fed) continue;
    blocks.push({
      federalId: fed.trim().replace(/\s+/g, "").slice(0, 11),
      isNonprofit: body.includes("isNonprofit=True"),
      logoUrl: get("logoUrl"),
      imageUrl: get("imageUrl"),
      hoursOpen: get("open"),
      hoursClose: get("close"),
      timeslot: "Morning",
      name,
      description: description.slice(0, 1000),
      street: get("street").slice(0, 100),
      zip: get("zip").slice(0, 18),
      city: get("city").slice(0, 17),
      state: get("state").slice(0, 12),
      phone: get("phone").replace(/\s/g, "").slice(0, 20),
      email: get("email").trim().slice(0, 255),
    });
  }
  return blocks;
}

/** Matches `Post(...)` blocks followed by session registration lines in the historical seeds. */
export function parsePostSeedSource(py: string): SeedPostDraft[] {
  const posts: SeedPostDraft[] = [];
  const re = /Post\(\s*([\s\S]*?)\s*\)\s*\n\s*db\.session\.add/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(py)) !== null) {
    const body = m[1];
    const num = (field: string) => {
      const mm = body.match(new RegExp(`${field}=(\\d+)`));
      return mm ? parseInt(mm[1], 10) : NaN;
    };
    const str = (field: string) => {
      const mm = body.match(new RegExp(`${field}=['"]([^'"]*)['"]`));
      return mm ? mm[1] : "";
    };
    const descMatch = body.match(/description=['"]([\s\S]*?)['"]\s*,\s*quantity=/);
    const description = descMatch ? descMatch[1].replace(/\\'/g, "'") : "";
    const titleMatch = body.match(/title=['"]([\s\S]*?)['"]\s*,\s*description=/);
    const title = titleMatch ? titleMatch[1].replace(/\\'/g, "'") : str("title");
    const expMatch = body.match(/expDate=['"]([\d-]+)['"]/);
    const statusMatch = body.match(/status\s*=\s*(\d+)/);
    const isItemMatch = body.match(/isItem=(True|False)/);
    const isItem = !!(isItemMatch && isItemMatch[1] === "True");
    const organizationId = num("organizationId");
    if (!title || Number.isNaN(organizationId)) continue;
    posts.push({
      isItem,
      organizationId,
      userId: num("userId"),
      title: title.slice(0, 25),
      description: description.slice(0, 120),
      quantity: str("quantity").slice(0, 12),
      categoryId: num("categoryId"),
      imageUrl: str("imageUrl"),
      expDate: expMatch ? expMatch[1] : "2022-09-18",
      status: statusMatch ? parseInt(statusMatch[1], 10) : 0,
    });
  }
  return posts;
}
