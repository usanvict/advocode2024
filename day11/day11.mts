import * as fsPromise from "node:fs/promises";

async function uploadInputForPartOne(fileName: string, blinkNumber: number) {
	const file = await fsPromise.open(fileName, "r");
	for await (const line of file.readLines()) {
		const allNumbers = line.split(" ");

		let result = allNumbers;
		for (let i = 0; i < blinkNumber; i++) {
			result = blink(result); // Pass the result back to the function
		}

		console.log(`The result is ${result.length}`);
	}
}

function blink(numberArray: string[]) {
	const newNumberArray: number[] = [];
	let step = 0;

	for (const element of numberArray) {
		const separatedNumber = Array.from(element);
		if (Number.parseInt(separatedNumber.join()) === 0) {
			newNumberArray[step] = 1;
			step += 1;
		} else if (separatedNumber.length % 2 === 0) {
			const halfLength = separatedNumber.length / 2;
			const firstStone = separatedNumber.slice(0, halfLength).join("");
			const secondStoneString = separatedNumber.slice(halfLength);

			//assign the first stone
			newNumberArray[step] = Number(firstStone);

			//check the second stone for zeros
			const firstNonZeroIndex = secondStoneString.findIndex(
				(digit) => digit !== "0",
			);
			if (firstNonZeroIndex === -1) {
				newNumberArray[step + 1] = Number.parseInt(secondStoneString.join());
			} else {
				const trimmedDigits = secondStoneString.slice(firstNonZeroIndex);
				newNumberArray[step + 1] = Number(trimmedDigits.join(""));
			}

			step += 2;
		} else {
			newNumberArray[step] = Number.parseInt(element) * 2024;
			step += 1;
		}
	}
	const result = newNumberArray.map(String);
	return result;
}

await uploadInputForPartOne("day11-input-test.txt", 75);
