import fs from 'fs';

export function countFileLines(filePath: string): Promise<number> {
	return new Promise((resolve, reject) => {
		let lineCount = 0;
		fs.createReadStream(filePath)
			.on('data', (buffer) => {
				let idx = -1;
				lineCount = -1;
				do {
					idx = buffer.indexOf(10 as any, idx + 1);
					lineCount += 1;
				} while (idx !== -1);
			})
			.on('end', () => {
				resolve(lineCount);
			})
			.on('error', reject);
	});
}
