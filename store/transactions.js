const axios = require('axios')

export const store = () => ({
    transcations: 0,
    txData: []
})

export const mutations = {
    addTransactionsCount(state, txCount) {
        state.transcations += txCount
    },
}

export const actions = {
    async fetchTx({ commit }, payload) {
        var txNum
        try {
            var txNum = await axios.post(
            'http://45.32.69.88/' + payload.chain + '-http',
            {
                jsonrpc: '2.0',
                method: 'eth_getBlockTransactionCountByNumber',
                params: ['0x' + payload.data.number[payload.position].toString(16)],
                id: 1,
            },
            {
                headers: {
                'content-type': 'application/json',
                },
            }
        )} catch (err) {
            console.log(err)
        }

        var txs = parseInt(txNum.data.result, 16)
        console.log(txs)
        commit('addTransactionsCount', txs)
    },
}