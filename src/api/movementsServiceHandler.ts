import { Movement } from "@/types/movementTypes";
import requestHandler from "./requestHandler";
import { Token } from "@/types/userTypes";
import { capitalize } from "@/utils/utils";

export async function createMovement(
  accessToken: Token,
  movement: Movement
): Promise<Movement> {
  if (!accessToken) {
    window.location.replace("/login");
    throw Error("No token Provided");
  }
  const request = await requestHandler.post(
    "movements",
    {
      ...movement
    },
    {
      headers: {
        Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
      },
    }
  );

  if (request.status > 299) {
    throw Error(
      `Error al intentar crear Movimiento : ${JSON.stringify(request.data)}`
    );
  }

  return request.data;
}

export async function updateMovement(accessToken: Token, movement: Movement) {
  if (!accessToken) {
    window.location.replace("/login");
    throw Error("No token Provided");
  }
  const request = await requestHandler.put(
    `movements/${movement.uuid}`,
    movement,
    {
      headers: {
        Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
      },
    }
  );
  
  if (request.status > 299) {
    throw Error(
      `Error al intentar crear Movimiento : ${JSON.stringify(request.data)}`
    );
  }
  return request.data;
}

export async function cancelMovement(accessToken: Token, movement: Movement) {
  if (!accessToken) {
    window.location.replace("/login");
    throw Error("No token Provided");
  }
  const request = await requestHandler.delete(
    `movements/${movement.uuid}`,
    {
      headers: {
        Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
      },
    }
  );

  if (request.status > 299) {
    throw Error(
      `Error al intentar crear Movimiento : ${JSON.stringify(request.data)}`
    );
  }
}
