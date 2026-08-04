// Materials: https://docs.google.com/document/d/1vRijotNonhPgDcDbbkI3GIfcHEw8O4mUJYJg38RbGSs/edit?usp=drive_link

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listenerFn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(listenerFn);
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            const listeners = this.events[eventName];

            for (const fn of listeners) {
                fn(...args);
            }
        }
    }
}

const em = new EventEmitter();

em.on('request', (data) => {
    console.log(`Request received with data: ${data}`);
});

em.emit('request', 'Hello, World!');
em.emit('request', 'Another request');
