const backendDomain = "http://localhost:8000";

const SummaryApi = {
    signup: {
        url: `${backendDomain}/signup`,
        method: "post"
    },

    login: {
        url: `${backendDomain}/signin`,
        method: "post"
    },

    profile: {
        url: `${backendDomain}/profile`,
        method: "put"
    },

    getProfile: {
        url: `${backendDomain}/me`,
        method: "get"
    },

    changepassword: {
        url: `${backendDomain}/ChangePassword`,
        method: "post",
    },
    ResetPassword: {
        url: `${backendDomain}/ResetPassword`,
        method: "post",
    },
    verifyOtp: {
        url: `${backendDomain}/verifyOtp`,
        method: "post"
    },
    becomeEducator: {
        url: `${backendDomain}/become-educator`,
        method: "put"
    },
    AddCourses: {
        url: `${backendDomain}/create-course`,
        method: "post"
    },
    AddChapters: {
        url: `${backendDomain}/create-chapter`,
        method: "post"
    },
    getCourses: {
        url: `${backendDomain}/get-courses`,
        method: "get"
    },
    getAllCourses: {
        url: `${backendDomain}/get-all-courses`,
        method: "get"
    },
    getFullcard: {
        url: `${backendDomain}/course`,
        method: "get"
    },
    courseStatusToggle: {
        url: `${backendDomain}/course-status-toggle`,
        method: "put"
    },
    onlinePayment: {
        url: `${backendDomain}/online-payment`,
        method: "post"
    },
    verifyPayment:{
        url:`${backendDomain}/verify-payment`,
        method:"post"
    },
    EnrolledStudent:{
        url:`${backendDomain}/Enrolled-Student`,
        method:"get"
    },
    dashbord:{
        url:`${backendDomain}/dashbord-info`,
        method:"get"
    },
    getEnrolledCourses:{
        url:`${backendDomain}/get-enrolled-courses`,
        method:'get'
    },
    getTutorials:{
        url:`${backendDomain}/get-tutorials`,
        method:'get'
    }
}

export default SummaryApi