import {twMerge} from "tailwind-merge"
import {clsx} from 'clsx'

function cn(...input) {
    return twMerge(clsx(input))
}

export {cn}