const toPaise = (amount) => {
  const value = String(amount);

  // Accept up to two decimal places.
  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    throw new Error("Invalid monetary amount");
  }

  const [rupees, paise = ""] = value.split(".");

  const result = Number(rupees) * 100 + Number(paise.padEnd(2, "0"));

  if (!Number.isSafeInteger(result) || result <= 0) {
    throw new Error("Amount must be a positive valid amount");
  }

  return result;
};

const formatRupees = (paise) => {
  return (Number(paise) / 100).toFixed(2);
};

module.exports = {
  toPaise,
  formatRupees,
};
