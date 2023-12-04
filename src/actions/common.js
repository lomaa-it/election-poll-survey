import { getAllDivisionRoute, getAllMandalRoute, getAllSachivalayamRoute, getAllPartsRoute, getAllVillageRoute, getAllNavaratnaluRoute } from "../utils/apis";
import instance from "../utils/axios";

export const getAllCommonData = (user) => async (dispatch) => {
  dispatch({
    type: "COMMON_LOAD_START",
  });

  try {
    console.log(user);
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

    const filtersData = {
      mandals: mandalsResponseData,
      divisions: divisionsResponseData,
      sachivalayams: sachivalayamResponseData,
      parts: partsResponseData,
      villages: villageResponseData,
      navaratnalu: navaratanaluResponseData,
    };

    if (user.mandal_pk != null) {
      filtersData["mandals"] = mandalsResponseData.filter((e) => e.mandal_pk == user.mandal_pk);
    }

    if (user.division_pk != null) {
      filtersData["divisions"] = divisionsResponseData.filter((e) => e.division_pk == user.division_pk);
    }

    if (user.sachivalayam_pk != null) {
      filtersData["sachivalayams"] = sachivalayamResponseData.filter((e) => e.sachivalayam_pk == user.sachivalayam_pk);
    }

    if (user.part_no != null) {
      filtersData["parts"] = partsResponseData.filter((e) => e.part_no == user.part_no);
    }

    if (user.village_pk != null) {
      filtersData["villages"] = villageResponseData.filter((e) => e.village_pk == user.village_pk);
    }

    console.log(filtersData);

    dispatch({
      type: "COMMON_LOAD_SUCCESS",
      payload: filtersData,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "COMMON_LOAD_ERROR",
      payload: err.message,
    });
  }
};
