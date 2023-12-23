export interface CollisionObject {
  center: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  max: {
    x: number;
    y: number;
  };
  min: {
    x: number;
    y: number;
  };
}

export function isCollision(
  obj1: CollisionObject,
  obj2: CollisionObject
): boolean {
  // Check for horizontal overlap
  const horizontalCollision =
    obj1.max.x >= obj2.min.x && obj1.min.x <= obj2.max.x;

  // Check for vertical overlap
  const verticalCollision =
    obj1.max.y >= obj2.min.y && obj1.min.y <= obj2.max.y;

  // If there is both horizontal and vertical overlap, then there is a collision
  return horizontalCollision && verticalCollision;
}
