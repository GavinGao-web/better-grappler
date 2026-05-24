export type Resource = {
  id: string;
  title: string;
  channel: string;
  url: string;
  tags: string[];
  thumbnail: string;
};

export const resources: Resource[] = [
  {
    id: "1",
    title: "Open Guard Masterclass — De La Riva & Lasso",
    channel: "Lachlan Giles",
    url: "https://www.youtube.com/watch?v=nS5jHGAZuMY",
    tags: ["open guard", "guard retention", "de la riva", "lasso", "guard passed"],
    thumbnail: "https://img.youtube.com/vi/nS5jHGAZuMY/hqdefault.jpg",
  },
  {
    id: "2",
    title: "Back Control — How to Keep the Back",
    channel: "John Danaher",
    url: "https://www.youtube.com/watch?v=9N8_QXHZ3nE",
    tags: ["back control", "back take", "rear naked choke", "lose back"],
    thumbnail: "https://img.youtube.com/vi/9N8_QXHZ3nE/hqdefault.jpg",
  },
  {
    id: "3",
    title: "Half Guard Sweeps — Complete Guide",
    channel: "Bernardo Faria",
    url: "https://www.youtube.com/watch?v=ZqKGTEkNYos",
    tags: ["half guard", "sweep", "get swept", "half guard pass"],
    thumbnail: "https://img.youtube.com/vi/ZqKGTEkNYos/hqdefault.jpg",
  },
  {
    id: "4",
    title: "Rear Naked Choke — Finish Every Time",
    channel: "Gordon Ryan",
    url: "https://www.youtube.com/watch?v=OGASsHuqJqk",
    tags: ["rear naked choke", "choke", "finish", "back control"],
    thumbnail: "https://img.youtube.com/vi/OGASsHuqJqk/hqdefault.jpg",
  },
  {
    id: "5",
    title: "Guard Retention — Stop Getting Passed",
    channel: "Mikey Musumeci",
    url: "https://www.youtube.com/watch?v=C2gGGXXhzKE",
    tags: ["guard retention", "guard passed", "open guard", "passing"],
    thumbnail: "https://img.youtube.com/vi/C2gGGXXhzKE/hqdefault.jpg",
  },
  {
    id: "6",
    title: "Armbar from Guard — Step by Step",
    channel: "Absolute MMA",
    url: "https://www.youtube.com/watch?v=UlKaHmNpzMo",
    tags: ["armbar", "guard", "submission", "finish armbar"],
    thumbnail: "https://img.youtube.com/vi/UlKaHmNpzMo/hqdefault.jpg",
  },
  {
    id: "7",
    title: "Triangle Choke — Setup & Finish",
    channel: "Chewjitsu",
    url: "https://www.youtube.com/watch?v=XY1kjP4MFNM",
    tags: ["triangle", "triangle choke", "guard", "submission"],
    thumbnail: "https://img.youtube.com/vi/XY1kjP4MFNM/hqdefault.jpg",
  },
  {
    id: "8",
    title: "Passing the Guard — Pressure Passing",
    channel: "Priit Mihkelson",
    url: "https://www.youtube.com/watch?v=FnBHOJJRoKo",
    tags: ["guard pass", "passing", "pressure pass", "torreando"],
    thumbnail: "https://img.youtube.com/vi/FnBHOJJRoKo/hqdefault.jpg",
  },
];

export function matchResources(problem: string): Resource[] {
  const lower = problem.toLowerCase();
  const scored = resources.map((r) => {
    const score = r.tags.filter((tag) => lower.includes(tag)).length;
    return { ...r, score };
  });
  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}