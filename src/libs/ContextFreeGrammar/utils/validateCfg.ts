import { checkForTermination } from './checkForTermination';

export function validateCfg(
	variables: string[],
	terminals: string[],
	transitionRecord: Record<string, string[]>,
	startVariable: string
) {
	// Check if all the variables is present in transition record
	const transitionRecordEntries = Object.entries(transitionRecord);
	if (transitionRecordEntries.length !== variables.length) {
		throw new Error('All variables must be present in the transition record');
	}
	const terminalsSet = new Set(terminals);
	const variablesSet = new Set(variables);
	// Validate that all the keys of transition record are variables
	transitionRecordEntries.forEach(([transitionRecordVariable, substitutedWords]) => {
		if (!variablesSet.has(transitionRecordVariable)) {
			throw new Error(
				`Transition record contains a variable ${transitionRecordVariable}, that is not present in variables array`
			);
		}
		// Check if all the substitutions contain either variable or terminal
		substitutedWords.forEach((substitutedWord) => {
			for (let index = 0; index < substitutedWord.length; index += 1) {
				const substitutedLetter = substitutedWord[index];
				// Check if the letter is a terminal
				const isTerminal = terminalsSet.has(substitutedLetter);
				// Check if the letter is a variable
				const isVariable = variablesSet.has(substitutedLetter);

				if (!isTerminal && !isVariable) {
					throw new Error(
						`Transition record substitution letter ${substitutedLetter} is neither a variable nor a terminal`
					);
				}
			}
		});
	});
	// Check if the substitutions will terminate at some point or not
	const willTerminate = checkForTermination(variables, terminals, transitionRecord);
	if (!willTerminate) {
		throw new Error(`Your transition function will never terminate.`);
	}
	// Check if the starting variable is part of variables
	if (!variablesSet.has(startVariable)) {
		throw new Error(`Starting variable must be part of variables array`);
	}
}