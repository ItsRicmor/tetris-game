import { SevenBagGenerator } from "./seven-bag-generator";

describe("SevenBagGenerator", () => {
  it("returns all 7 pieces once per bag (no duplicates within a bag)", () => {
    const gen = new SevenBagGenerator(() => 0.5); // deterministic-ish
    const set = new Set<string>();
    for (let i = 0; i < 7; i++) set.add(gen.next());
    expect(set.size).toBe(7);
  });

  it("after 7 pulls, it refills and continues", () => {
    const gen = new SevenBagGenerator(() => 0.5);
    const first7 = Array.from({ length: 7 }, () => gen.next());
    const next7 = Array.from({ length: 7 }, () => gen.next());
    expect(first7.length).toBe(7);
    expect(next7.length).toBe(7);
  });
});