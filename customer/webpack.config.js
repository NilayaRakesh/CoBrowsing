const config = {
    //basic module.exports rules here
}

module.exports = [
    config,
    {
        ...config,
        target: 'web', //target that needs special rules, then all your other special config rules in this object
        node: {
            fs: 'empty'
        }
    }
]