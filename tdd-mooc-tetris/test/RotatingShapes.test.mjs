import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.mjs";

const testShape = {
  top: `ABCD\nEFGH\nIJKL\nMNOP`,
  right: `MIEA\nNJFB\nOKGC\nPLHD`,
  bottom: `PONM\nLKJI\nHGFE\nDCBA`,
  left: `DHLP\nCGKO\nBFJN\nAEIM`,
}

describe("Rotating shape", () => {
  const shape = new RotatingShape(testShape);

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `ABCD
       EFGH
       IJKL
       MNOP`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `MIEA
       NJFB
       OKGC
       PLHD`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `DHLP
       CGKO
       BFJN
       AEIM`
    );
  });
});

