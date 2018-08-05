export default {
    getRoute(state) {
        return state.routeHistorys;
    },
    getCourses(state) {
        return state.courses;
    },
    getCoursesMaxId(state) {
        if (state.courses.length > 0) {
            const maxId = state.courses.slice(-1)[0];
            return maxId.id;
        }

    }
}