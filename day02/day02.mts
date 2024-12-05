import * as fsPromise from "node:fs/promises";

let firstPairDecreasing = false;
let firstPairIncreasing = false;

let safeReports = 0;
let counter = 0;

async function uploadInputForPartOne(fileName: string) {
	const file = await fsPromise.open(fileName, "r");
	for await (const line of file.readLines()) {
		const report = line.split(" ");
		const result = checkTheLine(report);
		if (result) {
			console.log(`Vysledek radku ${counter} je safe`);
		} else {
			console.log(`Vysledek radku ${counter} je unsafe`);
		}
		safeReports += result ? 1 : 0;
		counter = counter + 1;
		firstPairDecreasing = false;
		firstPairIncreasing = false;
	}
}

function checkTheLine(array: string[]): boolean {
	for (let i = 0; i < array.length - 1; i++) {
		const firstNumber = Number.parseInt(array[i]);
		const secondNumber = Number.parseInt(array[i + 1]);
		console.log(
			`First number is ${firstNumber} and second number is ${secondNumber}`,
		);
		if (
			Math.abs(secondNumber - firstNumber) > 3 ||
			Math.abs(secondNumber - firstNumber) < 1
		) {
			console.log("Not working because the difference is too big");
			return false;
		}
		if (firstNumber < secondNumber) {
			if (i === 0) {
				firstPairIncreasing = true;
			} else {
				if (firstPairDecreasing === true) {
					console.log("Not working because it should be decreasing array");
					return false;
				}
			}
		} else {
			if (i === 0) {
				firstPairDecreasing = true;
			} else {
				if (firstPairIncreasing === true) {
					console.log("Not working because it should be increasing array");
					return false;
				}
			}
		}
	}
	return true;
}

async function uploadInputForPartTwo(fileName: string) {
	const file = await fsPromise.open(fileName, "r");
	for await (const line of file.readLines()) {
		const report = line.split(" ");
		const result = checkTheLineAndDampBadLevel(report);
		if (result) {
			safeReports += 1;
		}
	}
}

function checkTheLineAndDampBadLevel(array: string[]) {
	for (let i = 0; i < array.length; i++) {
		const combination = array.filter((_, index) => index !== i);
		console.log(`Combination is ${combination}`);
		const result = checkTheLine(combination);
		firstPairDecreasing = false;
		firstPairIncreasing = false;
		if (result) {
			return true;
		}
	}
	return false;
}

// await uploadInputForPartOne("day02-input-clean.txt");
// console.log(`Number of safe reports is ${safeReports}`);

await uploadInputForPartTwo("day02-input-clean.txt");
console.log(`Number of safe reports is ${safeReports}`);
