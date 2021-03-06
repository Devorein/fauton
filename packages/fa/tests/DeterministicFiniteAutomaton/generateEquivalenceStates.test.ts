import { generateEquivalenceStates } from '../../libs/DeterministicFiniteAutomaton/generateEquivalenceStates';

describe('generateEquivalenceStates', () => {
	it(`Generate equivalent state groups`, () => {
		const equivalentStateGroups = generateEquivalenceStates(
			{
				alphabets: ['0', '1'],
				states: ['0', '1', '2', '3', '4', '5', '6', '7'],
				transitions: {
					0: {
						0: ['1'],
						1: ['5'],
					},
					1: {
						0: ['6'],
						1: ['2'],
					},
					2: {
						0: ['0'],
						1: ['2'],
					},
					3: {
						0: ['2'],
						1: ['6'],
					},
					4: {
						0: ['7'],
						1: ['5'],
					},
					5: {
						0: ['2'],
						1: ['6'],
					},
					6: {
						0: ['6'],
						1: ['4'],
					},
					7: {
						0: ['6'],
						1: ['2'],
					},
				},
			},
			[['0', '1', '3', '4', '5', '6', '7'], ['2']]
		);

		expect(equivalentStateGroups).toStrictEqual([['3', '5'], ['0', '4', '6'], ['1', '7'], ['2']]);
	});
});
