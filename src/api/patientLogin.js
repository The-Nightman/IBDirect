import { IBDirectAPI } from "./api";

export const patientLoginAPI = (formData) => {
    return IBDirectAPI
        .post("/Account/login/patient", formData)
        .then((res) => {
            return res
        })
}