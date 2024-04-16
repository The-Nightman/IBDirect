import { IBDirectAPI } from "./api";

export const patientLoginAPI = (formData) => {
    return IBDirectAPI
        .post("/account/login/patient", formData)
        .then((res) => {
            return res
        })
}