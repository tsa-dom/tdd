import { execSync } from "child_process"
import fs from 'fs'

const tcr = (cmd, dir) => {
  try {
    execSync(`npm run ${cmd} --prefix ${dir}`, {
      stdio: "inherit",
      env: { ...process.env },
    });
    console.log("Tests passed -> Commit changes");
    execSync("git add .", {
      stdio: "inherit",
    })
    execSync("git commit -m \"tcr: tests pass\"", {
      stdio: "inherit",
    })
  } catch (e) {
    console.log("Test failed -> Revert changes");
    execSync("git reset", { stdio: "inherit" })
    execSync("git add *test.js", { stdio: "inherit" })
    execSync("git add *spec.js", { stdio: "inherit" })
    execSync("git add *tcr.js", { stdio: "inherit" })
    execSync("git commit -m \"tcr: committed test files\"", {
      stdio: "inherit",
    })
    execSync("git reset --hard", { stdio: "inherit" });
  }
}

let prev = new Date()

fs.watch("frontend/src", { recursive: true }, (_event, _filename) => {
  const current = new Date()
  if (current - prev > 100) {
    prev = current
    try {
      if (_filename.includes('test.js') || _filename.includes('spec.js')) return
    } catch (err) {}
    tcr("test", "backend")
  }
})

fs.watch("backend", { recursive: true }, (_event, _filename) => {
  const current = new Date()
  if (current - prev > 100) {
    prev = current
    try {
      if (_filename.includes('test.js' || _filename.includes('spec.js'))) return
    } catch (err) {}
    tcr("test-ci", "frontend")
  }
})