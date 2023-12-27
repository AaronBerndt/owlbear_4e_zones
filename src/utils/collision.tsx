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

export function isAdjacent(box1: CollisionObject, box2: CollisionObject) {
  // Check if box2 is to the right of box1
  if (
    box2.min.x === box1.max.x &&
    ((box2.min.y >= box1.min.y && box2.min.y <= box1.max.y) ||
      (box2.max.y >= box1.min.y && box2.max.y <= box1.max.y))
  ) {
    return true;
  }

  // Check if box2 is to the left of box1
  if (
    box2.max.x === box1.min.x &&
    ((box2.min.y >= box1.min.y && box2.min.y <= box1.max.y) ||
      (box2.max.y >= box1.min.y && box2.max.y <= box1.max.y))
  ) {
    return true;
  }

  // Check if box2 is above box1
  if (
    box2.max.y === box1.min.y &&
    ((box2.min.x >= box1.min.x && box2.min.x <= box1.max.x) ||
      (box2.max.x >= box1.min.x && box2.max.x <= box1.max.x))
  ) {
    return true;
  }

  // Check if box2 is below box1
  if (
    box2.min.y === box1.max.y &&
    ((box2.min.x >= box1.min.x && box2.min.x <= box1.max.x) ||
      (box2.max.x >= box1.min.x && box2.max.x <= box1.max.x))
  ) {
    return true;
  }

  // Check if box2 is diagonally top-right of box1
  if (box2.min.x === box1.max.x && box2.min.y === box1.max.y) {
    return true;
  }

  // Check if box2 is diagonally top-left of box1
  if (box2.max.x === box1.min.x && box2.min.y === box1.max.y) {
    return true;
  }

  // Check if box2 is diagonally bottom-right of box1
  if (box2.min.x === box1.max.x && box2.max.y === box1.min.y) {
    return true;
  }

  // Check if box2 is diagonally bottom-left of box1
  if (box2.max.x === box1.min.x && box2.max.y === box1.min.y) {
    return true;
  }

  // If none of the above conditions are met, the boxes are not adjacent or diagonal
  return false;
}
