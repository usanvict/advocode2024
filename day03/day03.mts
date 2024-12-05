import * as fsPromise from "node:fs/promises";

const mulPattern: RegExp = /mul\((\d+),(\d+)\)/g;
const secondPattern: RegExp = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
const doPattern: RegExp = /do\(\)/g;
const dontPattern: RegExp = /don't\(\)/g;

let multiplications = 0;

async function uploadInputForPartOne(fileName: string) {
	const file = await fsPromise.open(fileName, "r");
	for await (const line of file.readLines()) {
		const matches = [...line.matchAll(mulPattern)];
		for (const match of matches) {
			multiplications += Number.parseInt(match[1]) * Number.parseInt(match[2]);
		}
	}
	console.log(`The result is ${multiplications}`);
}

async function uploadInputForPartTwo(fileName: string) {
	const file = await fsPromise.open(fileName, "r");
	let flag = false;
	for await (const line of file.readLines()) {
		const matches = [...line.matchAll(secondPattern)];
		for (const match of matches) {
			if (match[0].match(mulPattern) && !flag) {
				multiplications +=
					Number.parseInt(match[1]) * Number.parseInt(match[2]);
			}
			if (match[0].match(dontPattern)) {
				flag = true;
			}
			if (match[0].match(doPattern)) {
				flag = false;
			}
		}
	}
	console.log(`The result is ${multiplications}`);
}

//uploadInputForPartOne("day03-input-clean.txt");
await uploadInputForPartTwo("day03-input-clean.txt");
