import { readFile, writeFile } from 'fs/promises';

let data = Object.keys(JSON.parse(await readFile("./words.json", "utf8")));

await writeFile('./dictionary_seven.json', JSON.stringify(data.filter(item => item.length === 7)));