import { IBDirectAPI } from "./api";

export const patientLoginAPI = (formData) => {
    return IBDirectAPI
        .post("/Account/staff/patient", formData)
        .then((res) => {
            return res
        })
}