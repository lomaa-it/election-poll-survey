import { getAllDivisionRoute, getAllMandalRoute, getAllSachivalayamRoute, getAllPartsRoute, getAllVillageRoute, getAllNavaratnaluRoute, getAllCastesRoute, getAllReligionRoute, getAllDesignationsRoute } from "../utils/apis";
import instance from "../utils/axios";

export const getAllCommonData = (user) => async (dispatch) => {
  dispatch({
    type: "COMMON_LOAD_START",
  });

  try {
    const mandalResponse = await instance.post(getAllMandalRoute);
    const mandalsResponseData = mandalResponse.data?.message ?? [];

    const divisionsResponse = await instance.post(getAllDivisionRoute);
    const divisionsResponseData = divisionsResponse.data?.message ?? [];

    const sachivalayamResponse = await instance.post(getAllSachivalayamRoute);
    const sachivalayamResponseData = sachivalayamResponse.data?.message ?? [];

    const partsResponse = await instance.post(getAllPartsRoute);
    const partsResponseData = partsResponse.data?.message ?? [];

    const villageResponse = await instance.post(getAllVillageRoute);
    const villageResponseData = villageResponse.data?.message ?? [];

    const navaratnaluResponse = await instance.post(getAllNavaratnaluRoute);
    const navaratanaluResponseData = navaratnaluResponse.data?.message ?? [];

    const casteResponse = await instance.post(getAllCastesRoute);
    const casteResponseData = casteResponse.data?.message ?? [];

    const religionResponse = await instance.post(getAllReligionRoute);
    const religionResponseData = religionResponse.data?.message ?? [];

    const designationResponse = await instance.post(getAllDesignationsRoute);
    const designationResponseData = designationResponse.data?.message ?? [];

    const filtersData = {
      mandals: mandalsResponseData,
      divisions: divisionsResponseData,
      sachivalayams: sachivalayamResponseData,
      parts: partsResponseData,
      villages: villageResponseData,
      navaratnalu: navaratanaluResponseData,
      caste: casteResponseData.map((e) => ({
        label: e.lookup_valuename,
        value: e.lookup_pk,
      })),
      religion: religionResponseData.map((e) => ({
        label: e.lookup_valuename,
        value: e.lookup_pk,
      })),
      designation: designationResponseData.map((e) => ({
        label: e.lookup_valuename,
        value: e.lookup_pk,
      })),
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

    // console.log(filtersData);

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
