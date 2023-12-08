// export const baseServerUrl = "http://localhost:8080";
export const baseServerUrl = "https://poll-7ks0.onrender.com";
// export const baseServerUrl = "https://527b-123-201-170-203.ngrok-free.app";

// Voter Api

export const loginRoute = "/users-login";

// GET ALL DATA
export const getAllVotersRoute = "/voters/getall";
export const getAllUsersRoute = "/getalluserswithjoinandwhere";
export const getAllDesignationsRoute = "/designation/getall";
export const getAllPartiesRoute = "/getallparties";
export const getAllStatesRoute = "/states/getall";
export const getAllDistrictsRoute = "/districts/getall";
export const getAllConstituenciesRoute = "/constituencies/getall";
export const getAllMandalRoute = "/mandals/getall";
export const getAllDivisionRoute = "/divisions/getall";
export const getAllSachivalayamRoute = "/sachivalayam/getall";
export const getAllPartsRoute = "/parts/getall";
export const getAllVillageRoute = "/villages/getall";
export const getAllDistrictsWithJoinRoute = "/getalldistrictswithjoin";
export const getAllConstituenciesWithJoinRoute =
  "/getallconstituencieswithjoin";
export const getAllMandalsWithJoinRoute = "/getallmandalswithjoin";

export const getOpinionDashboardRoute = "/getopinionpolldashboard";
export const getOpinionResultRoute = "/getopinionreports";

export const getAllVotorsSurveyRoute = "/getallvoterswithjoinandwhere";
export const changeOpinionPollRoute = "/poll_survey";

export const getAllNavaratnaluRoute = "/navaratnalu/getall";

export const getAllCastesRoute = "/getAllCastes";
export const getAllReligionRoute = "/getAllReligion";

//////////////////
// GET BY ID
export const getDistrictById = "/districts/";
export const getDivisionsById = "/divisions-get-by-id/";
export const getSachivalayamById = "/sachivalayam-get-by-id/";
export const getPartsById = "/parts-get-by-id/";
export const getVillageById = "/villages-get-by-id/";

// Create
export const createUsersRoute = "/users";
export const createDesignationsRoute = "/lookup/";
export const createStatesRoute = "/states/";
export const createDistrictsRoute = "/districts/";
export const createConstituenciesRoute = "/constituencies/";
export const createMandalsRoute = "/mandals/";
export const createDivisionsRoute = "/divisions/";
export const createSachivalayamRoute = "/sachivalayam/";
export const createPartsRoute = "/parts/";
export const createVillagesRoute = "/villages/";

// Delete By Id
export const deleteStatesByIdRoute = "/states/";

// Update By Id
export const updateStatesByIdRoute = "/states/";
export const saveOrupdatedSurvey = "/save_or_updated_survey";
export const updateMandalByIdRoute = "/mandals/";

export const designationMappingRoute = "/designationmappingtousers";
