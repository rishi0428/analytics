/**
 * Created by Rishikesh on 10/05/20.
 */

function median(numbers) {
	let median = 0, numsLen = numbers.length;
	numbers.sort();

	if (
		numsLen % 2 === 0  // is even
	) {
		// average of two middle numbers
		median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
	} else { // is odd
		// middle number only
		median = numbers[(numsLen - 1) / 2];
	}

	return median;
}

function mean(numbers) {
	let total = 0, i;
	for (i = 0; i < numbers.length; i += 1) {
		total += numbers[i];
	}
	return total / numbers.length;
}

function mode(numbers) {
	let modes = [], count = [], i, number, maxIndex = 0;

	for (i = 0; i < numbers.length; i += 1) {
		number = numbers[i];
		count[number] = (count[number] || 0) + 1;
		if (count[number] > maxIndex) {
			maxIndex = count[number];
		}
	}

	for (i in count)
		if (count.hasOwnProperty(i)) {
			if (count[i] === maxIndex) {
				modes.push(Number(i));
			}
		}

	return modes;
}

function range(numbers) {
	if(!Array.isArray(numbers)|| !numbers.length){
		return [];
	}
	numbers.sort();
	return [numbers[0], numbers[numbers.length - 1]];
}

function variance(arr) {
	let len = 0;
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == "") { }
		else if (!isNaN(arr[i])) {
			// not number, letiance Calculation failed!");
			return 0;
		}
		else {
			len = len + 1;
			sum = sum + parseFloat(arr[i]);
		}
	}
	let v = 0;
	if (len > 1) {
		let mean = sum / len;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] == "") { }
			else { v = v + (arr[i] - mean) * (arr[i] - mean); }
		}
		return v / len;
	}
	else { return 0; }
}

module.exports = { median, mode, range, variance, mean };