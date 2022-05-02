const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
	if (!Array.isArray(arr)) {
		throw Error (`'arr' parameter must be an instance of the Array!`);
	}
	let result = arr.slice()

	for (let i = 0; i <= result.length-1; i++) {
		if (result[i] == '--double-prev' && i - 1 >= 0) {
			result[i] = result[i-1];
		}
		if (result[i] == '--double-next' && i + 1 < result.length) {
			result[i] = result[i+1];
		}
		if (result[i] == '--discard-prev' && i - 1 >= 0) {
			result[i - 1] = 'delete';
		}
		if (result[i] == '--discard-next' && i + 1 < result.length) {
			result [i + 1] = 'delete';
		}
	}
	return result.filter ((item) => item != 'delete' && item != '--discard-next' && item != '--discard-prev' && item != '--double-next' && item != '--double-prev');
}

module.exports = {
	transform
};
