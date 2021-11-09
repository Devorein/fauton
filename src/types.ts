export interface InputFiniteAutomaton {
	// Append a string to all the states
	append?: string;
	label: string;
	description?: string;
	start_state: string | number;
	final_states: (string | number)[];
	states: (string | number)[];
	// each key of transitions indicate a state
	transitions: Record<string | number, (Array<string | number> | (string | number))[] | 'loop'>;
}

export interface TransformedFiniteAutomaton {
	append?: string;
	label: string;
	description?: string;
	start_state: string;
	final_states: string[];
	states: string[];
	transitions: Record<string, Array<string>[] | 'loop'>;
}

export interface FiniteAutomatonModule {
	testLogic: (binary: string) => boolean;
	automaton: InputFiniteAutomaton;
}

export interface FiniteAutomatonModuleInfo {
	falsePositives: number;
	falseNegatives: number;
	truePositives: number;
	trueNegatives: number;
}

export type TFiniteAutomatonType = 'deterministic' | 'non-deterministic';
export interface GraphNode {
	name: string;
	state: string;
	symbol: null | string;
	children: GraphNode[];
	index: number;
	string: string;
}
