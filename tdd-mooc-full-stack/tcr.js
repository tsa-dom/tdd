import { execSync } from "child_process"
import fs from 'fs'

let prev = new Date()

fs.watch("frontend/src", { recursive: true }, (_event, _filename) => {
  const current = new Date()
  if (current - prev > 100) {
    prev = current
    if (_filename.includes('test.js')) return
    console.log(_event, _filename)
  }
})

fs.watch("backend", { recursive: true }, (_event, _filename) => {
  const current = new Date()
  if (current - prev > 100) {
    prev = current
    if (_filename.includes('test.js')) return
    try {
      execSync("npm run test --prefix backend", {
        stdio: "inherit",
        env: { ...process.env },
      });
      console.log("Tests passed -> Commit changes");
      /* execSync("git add .", {
        stdio: "inherit",
      })
      execSync("git commit -m \"tcr: tests pass\"", {
        stdio: "inherit",
      }) */
    } catch (e) {
      console.log("Test failed -> Revert changes");
//      execSync("git reset --hard", { stdio: "inherit" });
    }
  }
})