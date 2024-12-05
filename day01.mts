import * as fsPromise from "node:fs/promises";

let totalDifference = 0;
const firstLocations: number[] = [];
const secondLocations: number[] = [];
let counter = 0;

async function uploadInput(fileName: string) {
	const file = await fsPromise.open(fileName, "r");
	for await (const line of file.readLines()) {
		const array = line.split("  ");
		firstLocations[counter] = Number.parseInt(array[0]);
		secondLocations[counter] = Number.parseInt(array[1]);
		counter = counter + 1;
	}
}

function sort(locations: number[]) {
	locations.sort((a, b) => a - b);
}

function checkDiff(first: number, second: number) {
	totalDifference += first >= second ? first - second : second - first;
}

let totalSimilarity = 0;

function checkSimilarity(listToCheck: number[], listToMap: number[]) {
	for (let i = 0; i < listToCheck.length; i++) {
		const number = listToCheck[i];
		let counter = 0;
		for (let k = 0; k < listToMap.length; k++) {
			if (number === listToMap[k]) {
				counter = counter + 1;
			}
		}
		totalSimilarity += number * counter;
	}
}

async function partOne() {
	await uploadInput("input-test.txt");
	sort(firstLocations);
	sort(secondLocations);
	for (let i = 0; i < counter; i++) {
		checkDiff(firstLocations[i], secondLocations[i]);
	}
	console.log(`Total difference is ${totalDifference}`);
}

async function partTwo() {
	await uploadInput("input-clean.txt");
	checkSimilarity(firstLocations, secondLocations);
	console.log(`Total similarity is ${totalSimilarity}`);
}

partOne();
partTwo();
