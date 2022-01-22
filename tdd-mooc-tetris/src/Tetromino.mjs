import { RotatingShape } from "./RotatingShape.mjs"
import { I_SHAPE, J_SHAPE, L_SHAPE, O_SHAPE, S_SHAPE, T_SHAPE, Z_SHAPE } from "./shapes.mjs"

export const Tetromino = {
  T_SHAPE: new RotatingShape(T_SHAPE),
  I_SHAPE: new RotatingShape(I_SHAPE),
  O_SHAPE: new RotatingShape(O_SHAPE),
  J_SHAPE: new RotatingShape(J_SHAPE),
  Z_SHAPE: new RotatingShape(Z_SHAPE),
  S_SHAPE: new RotatingShape(S_SHAPE),
  L_SHAPE: new RotatingShape(L_SHAPE),
}