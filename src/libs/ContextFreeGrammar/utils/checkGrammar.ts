import { CFGOption, LanguageChecker } from '../../../types';
import { setDifference } from '../../../utils';
import { GenerateString } from '../../GenerateString';
import { generateCfgLanguage } from './generateCfgLanguage';
import { validateCfg } from './validateCfg';

export function checkGrammar(
	languageChecker: LanguageChecker,
	cfgOption: CFGOption,
	maxLength: number
) {
	validateCfg(cfgOption);
	const actualLanguage = GenerateString.generateAllCombosWithinLength(
		cfgOption.terminals,
		maxLength,
		0,
		languageChecker
	);
	const grammarLanguage = generateCfgLanguage(cfgOption, actualLanguage.length, maxLength);
	const grammarLanguageStrings = Object.keys(grammarLanguage).sort(
		(stringA, stringB) => stringA.length - stringB.length
	);
	// These strings exist in our cfg but not in our actual language
	const badWords = grammarLanguageStrings.filter((string) => !languageChecker(string));
	if (badWords.length) {
		console.log('These words are in cfg but not in actual language');
		console.log(badWords.join('\n'));
	} else {
		console.log('All words in cfg language are legal');
	}

	const difference = setDifference(new Set(actualLanguage), new Set(grammarLanguageStrings));
	if (difference.size) {
		if (difference.size > 1) {
			console.log('These words are in actual language but not in cfg');
		} else if (difference.size < -1) {
			console.log('These words are in cfg but not in actual language');
		}
		difference.forEach((word) => {
			console.log(word);
		});
	} else {
		console.log('CFG represents the actual language');
	}
}
