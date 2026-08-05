const { Worker } = require('worker_threads');
const path = require('path');

const jobs = Array.from({ length: 100 }, () => 1e9);

function chunkify(array, workerCount) {
    const chunks = [];
    const chunkSize = Math.ceil(array.length / workerCount);

    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

function run(jobs, cores) {
    const chunks = chunkify(jobs, cores);
    let completedWorkers = 0;

    chunks.forEach((chunk, index) => {
        const worker = new Worker(path.join(__dirname, 'worker.js'));
        worker.postMessage(chunk);

        worker.once('message', (result) => {
            console.log(`Worker ${index + 1} finished with result: ${result}`);
            completedWorkers++;

            if (completedWorkers === chunks.length) {
                const tock = performance.now();
                console.log(`Time taken: ${((tock - tick) / 1000).toFixed(2)} s`);
            }
        });

        worker.once('error', console.error);
    });
}

const tick = performance.now();

run(jobs, 10);
