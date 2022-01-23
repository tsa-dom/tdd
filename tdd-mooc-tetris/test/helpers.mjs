export const stepsDown = (board, steps) => {
  for (let i = 0; i < steps; i++) {
    board.moveDown();
  }
};

export const stepsLeft = (board, steps) => {
  for (let i = 0; i < steps; i++) {
    board.moveLeft();
  }
};

export const stepsRight = (board, steps) => {
  for (let i = 0; i < steps; i++) {
    board.moveRight();
  }
};

export const fullLineBottom = `..........
                        ..........
                        ..........
                        .ZOO....L.
                        ZZOO..OOL.
                        ZIIII.OOLL`;

export const fullLineTop = `..........
                     ..........
                     ..........
                     IIII....LL
                     ...TTT...L
                     ....T....L`;

export const fullLineMiddle = `..........
                        ..........
                        ..........
                        .Z.....ZZ.
                        ZZOO..OOZZ
                        Z.OO..OO..`;

export const twoFullLines = `..........
                      ..........
                      ..........
                      ..........
                      J...OO....
                      JJJ.OOZZLL
                      .T..LLLZZL
                      TTT.LIIIIL`;

export const rules1 = {
  level: 0,
  line1: (n) => 40 * (1 + n),
  line2: (n) => 100 * (1 + n),
  line3: (n) => 300 * (1 + n),
  line4: (n) => 1200 * (1 + n),
};

export const rules2 = {
  level: 0,
  line1: () => 1,
  line2: () => 3,
  line3: () => 9,
  line4: () => 27,
};
