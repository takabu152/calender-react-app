export const timeIso8601 = (date) => (date.toISOString())
export const toDate = (str, delim) => {
    let arr = str.split(delim)
    return new Date(arr[0], arr[1] - 1, arr[2])
}
