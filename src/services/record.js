import * as recordRepository from "../repository/record.js";

export const addRecord = async (recordData) => {
  if (recordData.amount <= 0) {
    throw new Error("金額必須大於0");
  }
  return await recordRepository.createRecord(recordData);
};

export const getRecordsByUserId = async (userId) => {
  if (!userId) throw new Error("無效的userId");

  const result = await recordRepository.findRecordsByUserId(userId);
  return result;
};
