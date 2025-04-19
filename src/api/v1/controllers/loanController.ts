import { Request, Response, NextFunction } from "express";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * @description Create Loan
 * @route POST /
 */
export const createLoan = (req: Request, res: Response, next: NextFunction): void => {
    try{
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(undefined, "Loan Created")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Review Loan
 * @route PUT /:id/review
 */
export const reviewLoan = (req: Request, res: Response, next: NextFunction): void => {
    try{
        res.status(HTTP_STATUS.OK).json(
            successResponse(undefined, "Loan Reviewed")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get All Loans
 * @route GET /
 */
export const getLoans = (req: Request, res: Response, next: NextFunction): void => {
    try{
        res.status(HTTP_STATUS.OK).json(
            successResponse(undefined, "Loans Retrieved")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Approve Loan
 * @route POST /:id/approve
 */
export const approveLoan = (req: Request, res: Response, next: NextFunction): void => {
    try{
        res.status(HTTP_STATUS.OK).json(
            successResponse(undefined, "Loan Approved")
        );
    } catch (error) {
        next(error);
    }
};