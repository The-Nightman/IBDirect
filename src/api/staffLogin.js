import { IBDirectAPI } from "./api";

export const staffLoginAPI = (formData) => {
    return IBDirectAPI
        .post("/Account/login/staff", formData)
        .then((res) => {
            return res
        })
}