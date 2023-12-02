// export const baseServerUrl = "http://localhost:8080";
export const baseServerUrl = "https://poll-7ks0.onrender.com";
// export const baseServerUrl = "https://554c-123-201-170-142.ngrok-free.app";

// Voter Api

// GET ALL DATA
export const getAllVotersRoute = "/voters/getall";
export const getAllUsersRoute = "/users/getall";
export const getAllStatesRoute = "/states/getall";
export const getAllDistrictsRoute = "/districts/getall";
export const getAllMandalRoute = "/mandals/getall";
export const getAllDivisionRoute = "/divisions/getall";
export const getAllSachivalayamRoute = "/sachivalayam/getall";
export const getAllPartsRoute = "/parts/getall";
export const getAllVillageRoute = "/villages/getall";
export const getAllDistrictsWithJoinRoute = "/getalldistrictswithjoin";
export const getAllConstituenciesWithJoinRoute = "/getallconstituencieswithjoin"

export const getOpinionDashboardRoute = "/getopinionpolldashboard";
export const getOpinionResultRoute = "/getopinionreports";

export const getAllVotorsSurveyRoute = "/getallvoterswithjoinandwhere";
export const changeOpinionPollRoute = "/poll_survey";

export const getAllNavaratnaluRoute = "/navaratnalu/getall";

// GET BY ID
export const getDivisionsById = "/divisions-get-by-id/";
export const getSachivalayamById = "/sachivalayam-get-by-id/";
export const getPartsById = "/parts-get-by-id/";
export const getVillageById = "/villages-get-by-id/";

export const createStatesRoute = "/states/";
export const createDistrictsRoute = "/districts/";
export const createConstituenciesRoute = "/constituencies/";

// Delete By Id
export const deleteStatesByIdRoute = "/states/";

// Update By Id
export const updateStatesByIdRoute = "/states/";
