export function makeIndices(start, delta, num) {
    const indices = [];

    while (indices.length < num) {
        indices.push(start);
        start += delta;
    }

    return indices;
};

