import { stat } from "fs";

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
    addCourses(state, courses) {
        const existCourses = state.courses.filter(o => o.id === courses.form.id);
        const {id,name,price,duration} = courses.form;
        const getCourses = {
            id: id,
            name: name,
            price: price,
            duration: price,
            subjectDoc: courses.subjectDoc
        }
        if (existCourses.length === 0) {
            state.courses.push(getCourses);
        }
    },
    updateCourses(state, courses) {
        const findIndex = state.courses.findIndex((o => o.id == courses.form.id));
        const {id,name,price,duration} = courses.form;
        state.courses.map(o => {
            if (o.id == id) {
                o.name = name,
                    o.price = price,
                    o.duration = duration,
                    o.subjectDoc = courses.subjectDoc
            }
        });
    },
    deleteCourses(state, courses) {
        const findCourses = state.courses.find(o => o.id === courses.id);
        state.courses.splice(state.courses.indexOf(findCourses), 1);
    },

    // subject 
    addSubject(state, subject) {
        const existSubject = state.subject.filter(o => o.id === subject.id)
        if (existSubject.length === 0) {
            state.subject.push(subject);
        }
    },
    updateSubject(state, subject) {
        const findIndex = state.subject.findIndex((o => o.id == subject.id));
        state.subject.map(o => {
            if (o.id == subject.id) {
                o.name = subject.name,
                    o.price = subject.price,
                    o.duration = subject.duration,
                    o.description = subject.description
            }
        });
    },
    deleteSubject(state, subject) {
        const findSubject = state.subject.find(o => o.id === subject.id);
        state.subject.splice(state.subject.indexOf(findSubject), 1);
    },

    // temp
    addTemp(state, temp) {
        if (!!temp) {
            const exist = state.temp.filter(o => o.id === temp.id)
            if (exist.length === 0) {
                state.temp.push(temp);
            }
        }
    },
    deleteTemp(state, id) {
        if (!!id) {
            const findSubject = state.temp.find(o => o.id === id);
            state.temp.splice(state.temp.indexOf(findSubject), 1);
        } else {
            state.temp.length = [];
        }
    },
}