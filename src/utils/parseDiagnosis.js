export const parseDiagnosis = (diagnosisString) => {
  const diagnosisMap = {
    CD: "Crohn's Disease",
    UC: "Ulcerative Colitis",
    IBDU: "IBD Unclassified",
    MC: "Microscopic Colitis",
  };

  return diagnosisMap[diagnosisString] || "Unknown Diagnosis";
};
