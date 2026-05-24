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
    title: "Guard Retention — How To Never Get Your Guard Passed",
    channel: "Gordon Ryan",
    url: "https://www.youtube.com/watch?v=URGwWYwdoAs",
    tags: ["open guard", "guard retention", "guard passed", "passing"],
    thumbnail: "https://img.youtube.com/vi/URGwWYwdoAs/hqdefault.jpg",
  },
  {
    id: "2",
    title: "BJJ Guard Retention Tricks & Full Guard Attacks",
    channel: "Chewjitsu",
    url: "https://www.youtube.com/watch?v=QE0DF0G-mqY",
    tags: ["guard retention", "full guard", "guard passed", "open guard"],
    thumbnail: "https://img.youtube.com/vi/QE0DF0G-mqY/hqdefault.jpg",
  },
  {
    id: "3",
    title: "Half Guard Sweeps for BJJ",
    channel: "Chewjitsu",
    url: "https://www.youtube.com/watch?v=5wSHLRUGjGk",
    tags: ["half guard", "sweep", "get swept", "half guard bottom"],
    thumbnail: "https://img.youtube.com/vi/5wSHLRUGjGk/hqdefault.jpg",
  },
  {
    id: "4",
    title: "Rear Naked Choke Details",
    channel: "Chewjitsu",
    url: "https://www.youtube.com/watch?v=AXgSIwHuRJk",
    tags: ["rear naked choke", "choke", "finish", "back control"],
    thumbnail: "https://img.youtube.com/vi/AXgSIwHuRJk/hqdefault.jpg",
  },
  {
    id: "5",
    title: "How to Keep Back Control in BJJ",
    channel: "Chewjitsu",
    url: "https://www.youtube.com/watch?v=RcLZhPGDCfE",
    tags: ["back control", "back take", "lose back", "rear naked choke"],
    thumbnail: "https://img.youtube.com/vi/RcLZhPGDCfE/hqdefault.jpg",
  },
  {
    id: "6",
    title: "Armbar from Guard Step by Step",
    channel: "Chewjitsu",
    url: "https://www.youtube.com/watch?v=QE0DF0G-mqY",
    tags: ["armbar", "guard", "submission", "finish armbar"],
    thumbnail: "https://img.youtube.com/vi/QE0DF0G-mqY/hqdefault.jpg",
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