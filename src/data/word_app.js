import { readFile, writeFile } from 'fs/promises';

// let data = Object.keys(JSON.parse(await readFile("./words.json", "utf8")));
let data = await readFile('./words-to-guess.js', 'utf8');
let dataArr = [];
let index = 0;
while (index < data.length) {
    dataArr.push(data.slice(index, index+5).toLowerCase());
    index += 6;

}
await writeFile('./words-for-guesses.json', JSON.stringify(dataArr))
console.log(dataArr)

// await writeFile('./dictionary_seven.json', JSON.stringify(data.filter(item => item.length === 7)));