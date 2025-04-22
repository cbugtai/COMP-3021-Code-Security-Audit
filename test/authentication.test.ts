import { Request, Response } from "express";
import authenticate from "../src/api/v1/middleware/authentication";
import { auth } from "../config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";

describe("Testing Authentication Middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("Should throw an erros if token is missing", async () => {
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith(expect.any(AuthenticationError));
    });

    it("should throw an error if token is invalid", async () => {
        // Assemble
        mockRequest.headers = {
            authorization: "Bearer ",
        };

        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith(expect.any(AuthenticationError));
    });

    it("should call next() when token is valid", async () => {
        // Assemble
        mockRequest.headers = {
            authorization: "Bearer mock-token",
        };

        // mock the google function "verifyIdToken"
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "mock-uid",
            role: "user",
        });

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(auth.verifyIdToken).toHaveBeenCalledWith("mock-token");
        expect(mockResponse.locals).toEqual({
            uid: "mock-uid",
            role: "user",
        });
        expect(nextFunction).toHaveBeenCalled();
    });
});