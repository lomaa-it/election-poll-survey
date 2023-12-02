import { getAllDivisionRoute, getAllMandalRoute, getAllSachivalayamRoute, getAllPartsRoute, getAllVillageRoute, getAllNavaratnaluRoute } from "../utils/apis";
import instance from "../utils/axios";

export const getAllCommonData = () => async (dispatch) => {
  dispatch({
    type: "COMMON_LOAD_START",
  });

  try {
    const mandalResponse = await instance.get(getAllMandalRoute);
    const mandalsResponseData = mandalResponse.data?.message ?? [];

    const divisionsResponse = await instance.get(getAllDivisionRoute);
    const divisionsResponseData = divisionsResponse.data?.message ?? [];

    const sachivalayamResponse = await instance.get(getAllSachivalayamRoute);
    const sachivalayamResponseData = sachivalayamResponse.data?.message ?? [];

    const partsResponse = await instance.get(getAllPartsRoute);
    const partsResponseData = partsResponse.data?.message ?? [];

    const villageResponse = await instance.get(getAllVillageRoute);
    const villageResponseData = villageResponse.data?.message ?? [];

    const navaratnaluResponse = await instance.get(getAllNavaratnaluRoute);
    const navaratanaluResponseData = navaratnaluResponse.data?.message ?? [];

    const filersData = {
      mandals: mandalsResponseData,
      divisions: divisionsResponseData,
      sachivalayams: sachivalayamResponseData,
      parts: partsResponseData,
      villages: villageResponseData,
      navaratnalu: navaratanaluResponseData,
    };

    console.log(filersData);

    dispatch({
      type: "COMMON_LOAD_SUCCESS",
      payload: filersData,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "COMMON_LOAD_ERROR",
      payload: err.message,
    });
  }
};
