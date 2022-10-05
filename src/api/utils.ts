import Axios, { AxiosError, AxiosResponse } from 'axios'

interface BaseErrorData {
  message: string
}
type ValidationErrors<T, ErrorMessage = Array<string>> = {
  [K in keyof T]: T[K] extends object ? ValidationErrors<T[K]> : ErrorMessage
}
interface ValidationErrorData<T> extends BaseErrorData {
  errors: ValidationErrors<T>
}

interface ApiError<T extends BaseErrorData> extends AxiosError<T> {
  response: Required<AxiosResponse<T>>
}
export function isError<Data extends BaseErrorData = BaseErrorData>(err: unknown): err is ApiError<Data> {
  return Axios.isAxiosError(err) && Boolean(err.response)
}
export function isValidationError<T = unknown>(err: unknown): err is ApiError<ValidationErrorData<T>> {
  return isError<ValidationErrorData<T>>(err) && err.response.status === 422
}
