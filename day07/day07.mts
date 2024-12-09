import * as fsPromise from "node:fs/promises";

const finalResults: number[] = [];
const step = 0;

async function uploadInputForPartOne(fileName: string) {
	const file = await fsPromise.open(fileName, "r");
	for await (const line of file.readLines()) {
		const allNumbers = line.split(":");
		const result = Number.parseInt(allNumbers[0]);
		const numbers = allNumbers[1].trim().split(" ");
		console.log(`Result number is ${result}`);
		console.log(`Rest of numbers are ${numbers}`);
		const someResult = check(result, numbers);
		finalResults.push(someResult);
	}
}

const isResult = 0;

function check(result: number, numbers: string[]) {
	function backtrack(step: number, isResult: number, path: string[]) {
		if (step === numbers.length) {
			if (isResult === result) {
				return result;
			}
			return 0;
		}

		// Try addition
		const addPath = [...path, `+${numbers[step]}`];
		const addResult = backtrack(
			step + 1,
			isResult + Number.parseInt(numbers[step]),
			addPath,
		);
		//console.log(`Adding is ${addResult}`);
		if (addResult) return addResult;

		// Try multiplication
		const multiplyPath = [...path, `*${numbers[step]}`];
		const multiplyResult = backtrack(
			step + 1,
			isResult * Number.parseInt(numbers[step]),
			multiplyPath,
		);
		//console.log(`Multiplying is ${multiplyResult}`);
		if (multiplyResult) return multiplyResult;

		// No solution found at this level
		return 0;
	}

	return backtrack(1, Number.parseInt(numbers[0]), [`${numbers[0]}`]);
}

await uploadInputForPartOne("day07-input-test.txt");

const sum = finalResults.reduce(
	(accumulator, currentValue) => accumulator + currentValue,
	0,
);
console.log(sum);
