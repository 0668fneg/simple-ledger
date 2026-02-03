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

export const getMonthlyStats = async (userId, year, month) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const rows = await recordRepository.findMonthlyRecords(userId, start, end);

  let income = 0;
  let expense = 0;

  rows.forEach((row) => {
    const val = parseFloat(row.amount);
    if (row.type === "income") income += val;
    else expense += val;
  });

  return {
    year,
    month,
    totalIncome: income.toFixed(2),
    totalExpense: expense.toFixed(2),
    balance: (income - expense).toFixed(2),
  };
};
