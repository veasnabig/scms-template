import { stat } from "fs";

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

    // teacher
    getTeacher(state) {
        return state.teacher;
    },
    getIncreaseTeacherId(state) {
        if (state.teacher.length > 0) {
            const maxId = state.teacher.slice(-1)[0];
            return +maxId.id + 1;
        }
    },
    getTotalTeacher(state) {
        if (state.teacher.length > 0) {
            return state.teacher.length;
        }
    },
    
    // student
    getStudent(state) {
        return state.student;
    },
    getIncreaseStudentId(state) {
        if (state.student.length > 0) {
            const maxId = state.student.slice(-1)[0];
            return +maxId.id + 1;
        }
    },
    getTotalStudent(state) {
        if (state.student.length > 0) {
            return state.student.length;
        }
    },

    // register
    getRegister(state) {
        return state.register;
    },
    getIncreaseRegisterId(state) {
        if (state.register.length > 0) {
            const maxId = state.register.slice(-1)[0];
            return +maxId.id + 1;
        }
    },
    getTotalRegister(state) {
        if (state.register.length > 0) {
            return state.register.length;
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

    // teacherAttendance
    getTeacherAttendance(state) {
        return state.teacherAttendance;
    },
    // studentAttendance
    getStudentAttendance(state) {
        return state.studentAttendance;
    },

    getCoursesSubject(state) {
        return state.coursesSubject;
    },

    getTemp(state) {
        return state.temp;
    }
}