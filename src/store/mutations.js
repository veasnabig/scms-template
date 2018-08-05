export default {
    // RouteHistory
    addRouteHistory(state, route) {
        const existRoute = state.routeHistorys.filter(o => o.name === route.name)
        if (existRoute.length === 0) {
            state.routeHistorys.push(route);
        }
    },
    removeRouteHistory(state, route) {
        const routeHistory = state.routeHistorys.find(o => o.name === route.name);
        state.routeHistorys.splice(state.routeHistorys.indexOf(routeHistory), 1);
    },
    removeAllRouteHistory(state) {
        state.routeHistorys = [];
    },

    // Courses 
    addCourses(state,courses){
        const existCourses = state.courses.filter(o => o.id === courses.id)
        if (existCourses.length === 0) {
            state.courses.push(courses);
        }
    }
}