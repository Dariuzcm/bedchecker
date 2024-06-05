import { Movement } from "@/types/movementTypes";
import requestHandler from "./requestHandler";
import { Token } from "@/types/userTypes";
import { capitalize } from "@/utils/utils";

export async function createMovement(
  accessToken: Token,
  movement: Movement
): Promise<Movement> {
  const request = await requestHandler.post(
    "movements",
    {
      notes: movement.notes,
      bedId: movement.bedId,
      serviceId: movement.serviceId,
      begin: movement.begin,
      end: movement.end,
    },
    {
      headers: {
        Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
      },
    }
  );
  return request.data;
}
