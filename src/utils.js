import purple from '@material-ui/core/colors/purple'
import deepPurple from '@material-ui/core/colors/deepPurple'
import indigo from '@material-ui/core/colors/indigo'
import blue from '@material-ui/core/colors/blue'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import green from '@material-ui/core/colors/green'
import lightGreen from '@material-ui/core/colors/lightGreen'
import amber from '@material-ui/core/colors/amber'
import deepOrange from '@material-ui/core/colors/deepOrange'
import red from '@material-ui/core/colors/red'

// From https://gist.github.com/mathewbyrne/1280286
export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')        // Remove all non-word chars
    .replace(/--+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
}

// From https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
export function ordinal(i) {
    var j = i % 10,
        k = i % 100
    if (j === 1 && k !== 11) {
        return i + 'st'
    }
    if (j === 2 && k !== 12) {
        return i + 'nd'
    }
    if (j === 3 && k !== 13) {
        return i + 'rd'
    }
    return i + 'th'
}

export const districtColors = {
    regional: '#fff',
    chs: purple[500],
    fim: deepPurple[500],
    in: indigo[500],
    isr: blue[500],
    mar: cyan[500],
    nc: teal[500],
    ne: green[500],
    ont: lightGreen[500],
    pch: amber[500],
    pnw: deepOrange[500],
    tx: red[500],
}
