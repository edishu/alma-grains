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
