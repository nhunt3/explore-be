// this is just a dummy test file
exports.main = async function (event, context) {
    const car = {
        make: 'Toyota 1',
        model: 'Corolla 1'
    };

    return {
        statusCode: 200,
        body: JSON.stringify(car)
    }
}
