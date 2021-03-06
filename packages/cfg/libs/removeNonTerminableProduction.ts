import { IContextFreeGrammarInput } from './types';
import { isAllTerminal } from './utils/isAllTerminal';
import { populateCfg } from './utils/populateCfg';
import { removeProductionRules } from './utils/removeProductionRules';
import { setDifference } from './utils/setOperations';

/* eslint-disable no-loop-func */

/**
 * Removes production rules which doesn't derive any terminals or terminable variables
 * @param cfg terminals, variables and production rules of cfg
 * @returns An array of variables that are all terminable
 */
export function removeNonTerminableProduction(inputCfg: IContextFreeGrammarInput) {
	const cfg = populateCfg(inputCfg);
	const { terminals, variables, productionRules } = cfg;

	// A set to keep track of variables which are terminable, ie we can reach a terminal from these variables
	// Initialize it with variables that derives only terminals in any of its production rules
	let terminableVariables: Set<string> = new Set(
		variables.filter((variable) =>
			// Guarding against variables that have no production rules
			productionRules[variable]?.some((productionRule) => isAllTerminal(terminals, productionRule))
		)
	);

	const variablesSet = new Set(variables);
	let done = false;

	// Check if any of the rule is contains only terminable variables
	function checkAnyRuleIsTerminable(nonTerminableVariable: string) {
		// Guarding against variables that have no production rules
		return productionRules[nonTerminableVariable]?.some((productionRuleSubstitution) => {
			// Extracting variables from substitutions
			const variablesFromWord = productionRuleSubstitution
				.split(' ')
				.filter((chunk) => variablesSet.has(chunk));
			// Checking if all the extracted variables are terminable
			return variablesFromWord.every((variable) => terminableVariables.has(variable));
		});
	}

	while (!done) {
		done = true;
		// Creating a set of temporary terminal variables set to replace later
		const tempTerminableVariables = new Set(Array.from(terminableVariables));
		// Current non terminable variables
		const nonTerminableVariables = setDifference(variablesSet, terminableVariables);
		nonTerminableVariables.forEach((nonTerminableVariable) => {
			const isAnyVariableTerminable = checkAnyRuleIsTerminable(nonTerminableVariable);
			// The variable is terminable if the word contains only terminable variables
			if (isAnyVariableTerminable) {
				// Set the done flag to false, as we need to check other variables which references this one to check whether they are terminal or not
				done = false;
				tempTerminableVariables.add(nonTerminableVariable);
			}
		});
		// Update the current terminable variables set with the temp one
		terminableVariables = tempTerminableVariables;
	}

	terminableVariables = new Set(
		removeProductionRules({
			productionRules,
			variables,
			removedVariables: Array.from(setDifference(variablesSet, terminableVariables)),
		})
	);
	if (!terminableVariables.has(inputCfg.startVariable!)) {
		throw new Error(`This grammar can't be convert to cnf`);
	}
	return Array.from(terminableVariables);
}
