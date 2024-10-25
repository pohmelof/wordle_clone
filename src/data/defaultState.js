import { nanoid } from "nanoid";

const getDefaultState = (cols = 5,  rows = 6) => {
    const arr = [];
    for (let i = 0; i < rows*cols; i++) {
            arr.push({
                id: nanoid(5),
                input: '',
                correctPosition: false,
                wrongPosition: false,
                notPresent: false,
              });
        }
    return arr;
}


export {getDefaultState};