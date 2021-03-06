import { generateParseTreeForString } from '../../libs/FiniteAutomaton/generateParseTreeForString';

describe('generateParseTreeForString', () => {
	it(`Generate parse tree for string`, () => {
		const parseTree = generateParseTreeForString(
			{
				final_states: ['c'],
				start_state: 'a',
				transitions: {
					a: {
						0: ['a', 'b'],
						1: ['a'],
					},
					b: {
						0: ['c'],
					},
				},
			},
			'100'
		);
		expect(parseTree).toStrictEqual({
			leafNodes: [
				{
					name: `a(0)`,
					state: 'a',
					string: '100',
					depth: 3,
					symbol: '0',
					children: [],
				},
				{
					name: `b(0)`,
					state: 'b',
					string: '100',
					depth: 3,
					symbol: '0',
					children: [],
				},
				{
					name: `c(0)`,
					state: 'c',
					string: '100',
					depth: 3,
					symbol: '0',
					children: [],
				},
			],
			verdict: true,
			tree: {
				name: `a`,
				state: 'a',
				string: '',
				depth: 0,
				symbol: null,
				children: [
					{
						name: `a(1)`,
						state: 'a',
						string: '1',
						depth: 1,
						symbol: '1',
						children: [
							{
								name: `a(0)`,
								state: 'a',
								string: '10',
								depth: 2,
								symbol: '0',
								children: [
									{
										name: `a(0)`,
										state: 'a',
										string: '100',
										depth: 3,
										symbol: '0',
										children: [],
									},
									{
										name: `b(0)`,
										state: 'b',
										string: '100',
										depth: 3,
										symbol: '0',
										children: [],
									},
								],
							},
							{
								name: `b(0)`,
								state: 'b',
								string: '10',
								depth: 2,
								symbol: '0',
								children: [
									{
										name: `c(0)`,
										state: 'c',
										string: '100',
										depth: 3,
										symbol: '0',
										children: [],
									},
								],
							},
						],
					},
				],
			},
		});
	});
});
