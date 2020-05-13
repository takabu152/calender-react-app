export const timeCurrentIso8601 = () => (new Date().toISOString())
export const toDate = (str, delim) => {
    let arr = str.split(delim)
    return new Date(arr[0], arr[1] - 1, arr[2])
}
