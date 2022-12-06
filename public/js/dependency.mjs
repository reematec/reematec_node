import {doStuff, DontdoStuff} from "./dependency_main.mjs"

export default function DisplayMessage() {
    return DontdoStuff()
}
export function justFunc() {
    return DontdoStuff()
}
