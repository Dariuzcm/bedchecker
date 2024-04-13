import requestHandler from "./requestHandler"

export const getAll = async () => {
  const response = await requestHandler.get('/pokemon')
  return response.data
}