import { isCollision, CollisionObject } from "./collision"; // Assuming your collision function is in a file named 'collision.ts'

describe("Collision Detection", () => {
  test("should detect collision when objects overlap", () => {
    const object1: CollisionObject = {
      center: { x: 5, y: 5 },
      width: 4,
      height: 4,
      max: { x: 7, y: 7 },
      min: { x: 3, y: 3 },
    };

    const object2: CollisionObject = {
      center: { x: 6, y: 6 },
      width: 3,
      height: 3,
      max: { x: 8, y: 9 },
      min: { x: 5, y: 5 },
    };

    expect(isCollision(object1, object2)).toBe(true);
  });

  test("should not detect collision when objects do not overlap", () => {
    const object1: CollisionObject = {
      center: { x: 1, y: 1 },
      width: 2,
      height: 2,
      max: { x: 2, y: 2 },
      min: { x: 0, y: 0 },
    };

    const object2: CollisionObject = {
      center: { x: 5, y: 5 },
      width: 3,
      height: 3,
      max: { x: 8, y: 8 },
      min: { x: 5, y: 5 },
    };

    expect(isCollision(object1, object2)).toBe(false);
  });
});
