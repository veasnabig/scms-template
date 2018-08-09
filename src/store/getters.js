import { stat } from "fs";

export const getter = (state) => {
    console.log(state)
    return state;
}

export default {
    getRoute(state) {
        return state.routeHistorys;
    },
    // courses
    getCourses(state) {
        return state.courses;
    },
    getIncreaseCoursesId(state) {
        if (state.courses.length > 0) {
            const maxId = state.courses.slice(-1)[0];
            return +maxId.id + 1;
        }
    },
    getTotalCourses(state) {
        if (state.courses.length > 0) {
            return state.courses.length;
        }
    },
    // subject
    getSubject(state) {
        return state.subject;
    },
    getIncreaseSubjectId(state) {
        if (state.subject.length > 0) {
            const maxId = state.subject.slice(-1)[0];
            return +maxId.id + 1;
        }
    },
    getTotalSubject(state) {
        if (state.subject.length > 0) {
            return state.subject.length;
        }
    },
    getCoursesSubject(state) {
        return state.coursesSubject;
    },

    getTemp(state) {
        return state.temp;
    }
}