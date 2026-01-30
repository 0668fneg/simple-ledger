import * as recordRepository from "../repository/record.js";

export const addRecord = async (recordData) => {
  if (recordData.amount <= 0) {
    throw new Error("金額必須大於0");
  }
  return await recordRepository.createRecord(recordData);
};
