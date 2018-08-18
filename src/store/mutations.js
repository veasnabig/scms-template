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
        const { id, name, price, duration } = courses.form;
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
        const { id, name, price, duration } = courses.form;
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

    // teacher
    addTeacher(state, teacher) {
        const existTeacher = state.teacher.filter(o => o.id === teacher.form.id);
        const { id, name, gender, dob, marriedStatus, tel, email, aob, address } = teacher.form;
        const getTeacher = {
            id: id,
            name: name,
            gender: gender,
            dob: dob,
            marriedStatus: marriedStatus,
            tel: tel,
            email: email,
            aob: aob,
            address: address,
            subjectDoc: teacher.subjectDoc
        }
        if (existTeacher.length === 0) {
            state.teacher.push(getTeacher);
        }
    },
    updateTeacher(state, teacher) {
        const findIndex = state.teacher.findIndex((o => o.id == teacher.form.id));
        const { id, name, gender, dob, marriedStatus, tel, email, aob, address } = teacher.form;
        console.log(teacher.subjectDoc);
        state.teacher.map(o => {
            if (o.id == id) {
                o.name = name,
                    o.gender = gender,
                    o.dob = dob,
                    o.marriedStatus = marriedStatus,
                    o.tel = tel,
                    o.email = email,
                    o.aob = aob,
                    o.address = address
                o.subjectDoc = teacher.subjectDoc
            }
        });
    },
    deleteTeacher(state, teacher) {
        const findTeacher = state.teacher.find(o => o.id === teacher.id);
        state.teacher.splice(state.courses.indexOf(findTeacher), 1);
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

    // student
    addStudent(state, student) {
        const existStudent = state.student.filter(o => o.id === student.id);
        if (existStudent.length === 0) {
            state.student.push(student);
        }
    },
    deleteStudent(state, student) {
        const findStudent = state.student.find(o => o.id === student.id);
        state.student.splice(state.student.indexOf(findStudent), 1);
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

    // login
    login(state, user) {
        if (!!user) {
            let { username, password } = user;
            const findUser = this.state.user.find((o) => {
                return o;
            });
            if (username === findUser.username && password === findUser.password) {
                this.state.loginStatus = true;
            } else {
                this.state.loginStatus = false;
            }
        }
    },

    // logout
    logout(state) {
        this.state.loginStatus = false;
    }
}