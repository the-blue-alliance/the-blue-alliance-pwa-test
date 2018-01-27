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
