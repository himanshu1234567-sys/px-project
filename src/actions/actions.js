import { apiPost } from "../utils/utils"


const baseurl = "https://task.8px.us/api"

export const login = (data) => {
    return apiPost(`${baseurl}/task/auth/signin`, data)
}
