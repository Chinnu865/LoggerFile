const { createLogger, transports, format } = require('winston');

const customFormat = format.combine(format.timestamp({ format:"DD:MM:YY::HH:mm:ss" }), format.printf((info) => {
    return `${info.timestamp}-[${info.level.toUpperCase().padEnd(5)}]-${info.message}`
}));

const userLogger = createLogger({
    transports:[
        new transports.File({
            filename:'./logs/user.log',
            level:'info',
            format:customFormat,
        })
    ]
})

const userErrorLogger = createLogger({
    transports:[
        new transports.File({
            filename:'./logs/userError.log',
            level:'error',
            format:customFormat,
        })
    ]
})

module.exports = { userLogger, userErrorLogger };