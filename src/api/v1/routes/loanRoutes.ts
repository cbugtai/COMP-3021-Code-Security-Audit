import express, { Router } from "express";

import * as loanController from "../controllers/loanController"
import authenticate from "../middleware/authentication";
import isAuthorized from "../middleware/authorization";

const router: Router = express.Router();

// URL/api/v1/loans

/**
 * @route POST /
 * @description Creates a Loan
 * 
 * @openapi
 * /api/v1/loans/:
 *   post:
 *     summary: Allows a user to create a loan
 *     tags: [Loans]
 *     security:
 *       - Authentication: Bearer {Valid Token}
 *       - Authorization: ["admin","user"]
 *     responses:
 *       201:
 *         description: Loan Created
 *       401:
 *         description: Invalid Token
 *       403:
 *         description: Insufficient Role
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "user"] }),
    loanController.createLoan)

/**
 * @route PUT /:id/review
 * @description Review a loan
 * 
 * @openapi
 * /api/v1/loans/:id/review:
 *   put:
 *     summary: Allows an officer to review a loan
 *     tags: [Loans]
 *     security:
 *       - Authorization: Bearer {Valid Token}
 *       - Authorization: ["admin","officer"]
 *     responses:
 *       200:
 *         description: Loan Reviewed
 *       401:
 *         description: Invalid Token
 *       403:
 *         description: Insufficient Role
 */
router.put(
    "/:id/review",
    authenticate,
    isAuthorized({ hasRole: ["admin", "officer"] }),
    loanController.reviewLoan)

/**
 * @route GET /
 * @description Get All Loans
 * 
 * @openapi
 * /api/v1/loans/:
 *   get:
 *     summary: Allows an officer or manager to retrive all loans
 *     tags: [Loans]
 *     security:
 *       - Authorization: Bearer {Valid Token}
 *       - Authorization: ["admin","officer", "manager"]
 *     responses:
 *       200:
 *         description: Loan Retrieved
 *       401:
 *         description: Invalid Token
 *       403:
 *         description: Insufficient Role
 */
router.get(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "officer", "manager"] }),
    loanController.getLoans)

/**
 * @route PUT /:id/approve
 * @description Approve Loan
 * 
 * @openapi
 * /api/v1/loans/:id/approve:
 *   put:
 *     summary: Allows a manager to apporve a loan
 *     tags: [Loans]
 *     security:
 *       - Authorization: Bearer {Valid Token}
 *       - Authorization: ["admin", "manager"]
 *     responses:
 *       200:
 *         description: Loan Approved
 *       401:
 *         description: Invalid Token
 *       403:
 *         description: Insufficient Role
 */
router.put(
    "/:id/approve",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    loanController.approveLoan)

export default router;