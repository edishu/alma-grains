const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Take file path as cli input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter the path to the CSV file: ", function (filePath) {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error("File does not exist.");
    return rl.close();
  }

  const stream = fs.createReadStream(absolutePath);

  const lineReader = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  lineReader.on("line", function (line) {
    try {
      const [aStr, bStr, cStr] = line.split(",");
      const [a, b, c] = [parseInt(aStr), parseInt(bStr), parseInt(cStr)];
      console.log(`Inputs: A = ${a}, B = ${b}, C = ${c}`);
      const sequence = findGrainBagSequence(a, b, c);
      sequence.forEach((seq) => {
        console.log(seq.join(" "));
      });
      console.log("==========================");
      console.log("\n");
    } catch {
      console.log("Bad input file");
    }
  });

  lineReader.on("close", function () {
    rl.close();
  });
});

// Main function
function findGrainBagSequence(capA, capB, goal) {
  const visited = new Set();
  const queue = [{ state: [0, 0], steps: [] }];

  while (queue.length > 0) {
    const { state, steps } = queue.shift();

    if (state[0] + state[1] === goal) {
      return steps;
    }

    const stateKey = state.join(",");
    if (visited.has(stateKey)) {
      continue;
    }
    visited.add(stateKey);

    // Operations
    queue.push({
      state: [capA, state[1]],
      steps: [...steps, [capA, state[1]]],
    });
    queue.push({
      state: [state[0], capB],
      steps: [...steps, [state[0], capB]],
    });
    queue.push({ state: [0, state[1]], steps: [...steps, [0, state[1]]] });
    queue.push({ state: [state[0], 0], steps: [...steps, [state[0], 0]] });

    // Transfer A to B
    let transfer = Math.min(state[0], capB - state[1]);
    queue.push({
      state: [state[0] - transfer, state[1] + transfer],
      steps: [...steps, [state[0] - transfer, state[1] + transfer]],
    });

    // Transfer B to A
    transfer = Math.min(state[1], capA - state[0]);
    queue.push({
      state: [state[0] + transfer, state[1] - transfer],
      steps: [...steps, [state[0] + transfer, state[1] - transfer]],
    });
  }

  return [["Impossible"]]; // No solution found
}
