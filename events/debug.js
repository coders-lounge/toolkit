module.exports = {
    name: 'debug',
    once: false,
    execute: (client, info) => {
        console.log(info)
    },
};