const { parentPort } = require('worker_threads');

function performJob(job) {
    let count = 0;
    for (let i = 0; i < job.length; i++) {
        for (let j = 0; j < job[i]; j++) {
            count++;
        }
    }
    return count;
}

parentPort.once('message', (job) => {
    const result = performJob(job);
    parentPort.postMessage(result);
});
