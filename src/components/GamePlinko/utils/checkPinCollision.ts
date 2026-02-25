import type { Container } from "pixi.js";

export const checkPinCollision = (
  ball: Container, 
  pins: Container[],
) => {
  
  return pins.find((pin) => {
    const distanceX = ball.position.x - pin.position.x;
    const distanceY = ball.position.y - pin.position.y;
    
    const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    
    
    return distance < (6 + (5));
  });

};
