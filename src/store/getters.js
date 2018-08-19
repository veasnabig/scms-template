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
    getTotalTeacherAttendance(state) {
        if (state.teacherAttendance.length > 0) {
            return state.teacherAttendance.length;
        }
    },

    // studentAttendance
    getStudentAttendance(state) {
        return state.studentAttendance;
    },
    getTotalStudentAttendance(state) {
        if (state.studentAttendance.length > 0) {
            return state.studentAttendance.length;
        }
    },

    // examPaper
    getExamPaper(state) {
        return state.examPaper;
    },
    getTotalExamPaper(state) {
        if (state.examPaper.length > 0) {
            return state.examPaper.length;
        }
    },

    // examScore
    getExamScore(state) {
        return state.examScore;
    },
    getTotalExamScore(state) {
        if (state.examScore.length > 0) {
            return state.examScore.length;
        }
    },

    // examResult
    getExamResult(state) {
        return state.examResult;
    },
    getTotalExamResult(state) {
        if (state.examResult.length > 0) {
            return state.examResult.length;
        }
    },

    // loginStatus
    getLoginStatus(state){
        return state.loginStatus;
    },

    // certificate
    getCertificate(state) {
        return state.certificate;
    },

    getCoursesSubject(state) {
        return state.coursesSubject;
    },

    getTemp(state) {
        return state.temp;
    }
}