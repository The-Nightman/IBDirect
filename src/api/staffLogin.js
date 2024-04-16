import { IBDirectAPI } from "./api";

export const staffLoginAPI = (formData) => {
    return IBDirectAPI
        .post("/account/login/staff", formData)
        .then((res) => {
            return res
        })
}