import { TetrominoShape } from "./TetrominoShape.mjs"

export const Tetromino = {
  T_SHAPE: new TetrominoShape(4, '.T.\nTTT\n...\n'),
  I_SHAPE: new TetrominoShape(2, '.....\n.....\nIIII.\n.....\n.....\n'),
  O_SHAPE: new TetrominoShape(1, '.OO\n.OO\n...\n')
}

