export const parseDiagnosis = (diagnosisString) => {
    if (diagnosisString === "CD") {
      return "Crohn's Disease";
    } else if (diagnosisString === "UC") {
      return "Ulcerative Colitis";
    }
  };