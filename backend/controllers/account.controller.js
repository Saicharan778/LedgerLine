const accountService = require("../services/account.service");

const createAccount = async (req, res, next) => {
  try {
    const account = await accountService.createAccount(req.user.id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

const getAccounts = async (req, res, next) => {
  try {
    const accounts = await accountService.getAccounts(req.user);

    return res.status(200).json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    next(error);
  }
};

const getAccountById = async (req, res, next) => {
  try {
    const account = await accountService.getAccountById(
      req.params.id,
      req.user,
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
};
