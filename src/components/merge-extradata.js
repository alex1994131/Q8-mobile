Object.defineProperty(exports, "__esModule", { value: true });
function areInputsEqual(newInputs, lastInputs) {
    for (let i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}
let lastArgs = [];
let lastResult = 0;
function mergeExtraData(...newArgs) {
    if (areInputsEqual(newArgs, lastArgs)) {
        return lastResult;
    }
    lastResult = lastResult === 10 ? 0 : lastResult + 1;
    lastArgs = newArgs;
    return lastResult;
}
exports.default = mergeExtraData;
