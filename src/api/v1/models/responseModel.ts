/**
 * Represents a standardized API response structure.
 * This interface ensures consistent response formatting across all API endpoints.
 *
 * @template T - The type of data being returned in case of success
 *
 * @property status - Indicates if the operation was successful ('success' or 'error')
 * @property data - Optional payload returned on successful operations
 * @property message - Optional informational message about the operation result
 * @property error - Error message in case of failure
 * @property code - Optional error code for client-side error handling
 */
interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
}

/**
 * Creates a success response object.
 * @template T - The type of the data property.
 * @param {T} [data] - The data to include in the response.
 * @param {string} [message] - A message providing additional information about the response.
 * @returns {ApiResponse<T | {}>} The success response object.
 */
export const successResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});

/**
 * Creates an error response object.
 * @param {string} message - The error message.
 * @param {string} [code] - The error code.
 * @returns {ApiResponse<null>} The error response object.
 */
export const errorResponse = (
    message: string,
    code?: string
): ApiResponse<null> => ({
    status: "error",
    message,
    code,
});