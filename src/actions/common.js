import ApiServices from "../services/apiservices";
import {
  getAllDivisionRoute,
  getAllMandalRoute,
  getAllSachivalayamRoute,
  getAllPartsRoute,
  getAllVillageRoute,
  getAllNavaratnaluRoute,
  getAllCastesRoute,
  getAllReligionRoute,
  getAllDesignationsRoute,
  getTicketStatusRoute,
  getAllPartiesRoute,
} from "../utils/apis";

export const getAllCommonData = (user) => async (dispatch) => {
  dispatch({
    type: "COMMON_LOAD_START",
  });

  try {
    const mandalResponse = await ApiServices.postRequest(getAllMandalRoute);
    const mandalsResponseData = mandalResponse.data?.message ?? [];

    const divisionsResponse = await ApiServices.postRequest(getAllDivisionRoute);
    const divisionsResponseData = divisionsResponse.data?.message ?? [];

    const sachivalayamResponse = await ApiServices.postRequest(getAllSachivalayamRoute);
    const sachivalayamResponseData = sachivalayamResponse.data?.message ?? [];

    const partsResponse = await ApiServices.postRequest(getAllPartsRoute);
    const partsResponseData = partsResponse.data?.message ?? [];

    const villageResponse = await ApiServices.postRequest(getAllVillageRoute);
    const villageResponseData = villageResponse.data?.message ?? [];

    const navaratnaluResponse = await ApiServices.postRequest(getAllNavaratnaluRoute);
    const navaratanaluResponseData = navaratnaluResponse.data?.message ?? [];

    const casteResponse = await ApiServices.postRequest(getAllCastesRoute);
    const casteResponseData = casteResponse.data?.message ?? [];

    const religionResponse = await ApiServices.postRequest(getAllReligionRoute);
    const religionResponseData = religionResponse.data?.message ?? [];

    const designationResponse = await ApiServices.postRequest(getAllDesignationsRoute);
    const designationResponseData = designationResponse.data?.message ?? [];

    const ticketStatusResponse = await ApiServices.postRequest(getTicketStatusRoute);
    const ticketStatusResponseData = ticketStatusResponse.data?.message ?? [];

    const partiesResponse = await ApiServices.postRequest(getAllPartiesRoute);
    const partiesResponseData = partiesResponse.data?.message ?? [];

    // console.log("statusResponseData", statusResponseData);

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
      ticket: ticketStatusResponseData.map((e) => ({
        label: e.ticket_status,
        value: e.lookup_pk,
      })),
      parties: partiesResponseData.map((e) => ({
        label: e.party_name,
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

    // if (user.village_pk != null) {
    //   filtersData["villages"] = villageResponseData.filter((e) => e.village_pk == user.village_pk);
    // }

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
