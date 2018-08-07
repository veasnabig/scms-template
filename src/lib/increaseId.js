const increaseId = (val) => {
    let rs = "";
    if (val < 10)
        rs = `000${val}`;
    else if (val >= 10)
        rs = `00${val}`;
    else if (val)
        rs = `${val}`;
    else {
        rs = `0${val + 1}`;
    }
    return rs;
}
export default increaseId;