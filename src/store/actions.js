export default {
    deleteTemp({ commit },id) {
        setTimeout(() => {
            commit('deleteTemp',id)
        }, 1000);
    }
}