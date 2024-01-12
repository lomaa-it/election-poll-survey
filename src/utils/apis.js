// export const baseServerUrl = "http://localhost:8080";
// export const baseServerUrl = "https://poll-7ks0.onrender.com";
// export const baseServerUrl = "https://cd30-123-201-175-198.ngrok-free.app";

import LsService from "../services/localstorage";

// new api for baseServerUrl
// export const baseServerUrl = "https://6eab-123-201-175-208.ngrok-free.app/";

// export const baseServerUrl = "https://d1ef-123-201-174-192.ngrok-free.app";
export const baseServerUrl = "https://backendapi.cgrysrcongress.in";
// export const baseServerUrl = "http://192.168.137.25:8080";

// export const baseServerUrl = "http://192.168.222.177:8080";
/// new
// export const baseServerUrl = "https://poll2.onrender.com";

// Access Management Api's
export const getallAccessPermissions = "/getall_access_permissions";
export const getPermissionListRoute = "/getpermissionlist";
export const getAuthPermissionListRoute = "/getauthpermissionlist";

export const updatePermissionListRoute = "/updatepermissionlist";

// Survey Dashboard Apis
export const getDashBoardbyTotalVoters = "/getdashboardbytotalvoters";
export const getDashBoardbyGenderCount = "/getdashboardbygendercount";
export const getDashBoardbyStatusCount = "/getdashboardbystatuscount";
export const getDashBoardbyVoterPulse = "/getdashboardbyvoterpulse";
export const getDashBoardbyTicketStatus = "/getdashboardbyticketstatus";
export const getDashBoardbyCasteCount = "/getdashboardbycastecount";
export const getDashBoardbyReligionCount = "/getdashboardbyreligioncount";
export const getDashBoardbyDisabilityCount = "/getdashboardbydisabilitycount";
export const getDashBoardbyGovtEmployeeCount = "/getdashboardbygovtemployeecount";
export const getDashBoardbyResidentialStatus = "/getdashboardbyresidentialstatus";
export const getDashBoardbyageGroup = "/getdashboardbyagegroup";
export const getDashBoardbyTicketbarChart = "/getdashboardbyticketbarchart";

// opinion survey
export const getVotersListTotals = "/getvoterslisttotals";

/// View User
export const deleteUserById = "/users/";

// Add Voters
export const addVoters = "/voters";
export const deleteVotersById = "/voters/";

// View Voters
export const sachivalayamMappingtoVotersRoute = "/sachivalayammappingtovoters";

// FORGET PASSWORD ROUTE
export const userValidationwithPhonenoRoute = "/uservalidationwithphoneno";
export const saveNewPassword = "/savenewpassword";

// Voter Api
export const loginRoute = "/users-login";
export const resetPswdRoute = "/updateuserpassword";

// Parts Page Api
export const getallpartsbysachivalayamidRoute = "/getallpartsbysachivalayamid";
export const sachivalayammappingtopartsRoute = "/sachivalayammappingtoparts";

// GET ALL DATA
export const getVillagesBySachivalayamIdRoute = "/getvillagesbysachivalayamid";
export const getVoterTicketHistoryRoute = "/getvotertickethistory";
export const getTicketStatusRoute = "/getticketstatus";
export const getAllTicketsRoute = "/getallticketswithjoinandwhere";
export const getAllVotersRoute = "/voters/getall";
export const getAllUsersRoute = "/getalluserswithjoinandwhere";
export const getAllDesignationsRoute = "/getalldesignations";
export const getAllPartiesRoute = "/getallparties";
export const getAllStatesRoute = "/states/getall";
export const getAllDistrictsRoute = "/districts/getall";
export const getAllConstituenciesRoute = "/constituencies/getall";
export const getAllMandalRoute = "/mandals/getall";
export const getAllDivisionRoute = "/divisions/getall";
export const getAllSachivalayamRoute = "/sachivalayam/getall";
export const getAllPartsRoute = "/parts/getall";
export const getAllVillageRoute = "/villagesgetall";
export const getAllDistrictsWithJoinRoute = "/getalldistrictswithjoin";
export const getAllConstituenciesWithJoinRoute = "/getallconstituencieswithjoin";
export const getAllMandalsWithJoinRoute = "/getallmandalswithjoin";

export const getOpinionDashboardRoute = "/getopinionpolldashboard";
export const getOpinionResultRoute = "/getopinionreports";

// opinion report routes
export const getSurveySummaryByConstituency = "/getsurveysummarybyconstituency";
export const getSurveyResultsByConstituency = "/getsurveyresultsbyconstituency";

export const getAllVotorsSurveyRoute = "/getallvoterswithjoinandwhere";
export const changeOpinionPollRoute = "/poll_survey";

export const getAllNavaratnaluRoute = "/navaratnalu/getall";

export const getAllCastesRoute = "/getAllCastes";
export const getAllReligionRoute = "/getAllReligion";
export const getNextLevelUserRoute = "/getnextleveluser";

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
export const createReligionRoute = "/lookup/";
export const createCasteRoute = "/lookup/";
export const createStatesRoute = "/states/";
export const createDistrictsRoute = "/districts/";
export const createConstituenciesRoute = "/constituencies/";
export const createMandalsRoute = "/mandals/";
export const createDivisionsRoute = "/divisions/";
export const createSachivalayamRoute = "/sachivalayam/";
export const createPartsRoute = "/parts/";
export const createVillagesRoute = "/villages/";
export const createTicketRoute = "/createticketinticketmasterandtickethistory";
export const createTicketHistoryRoute = "/ticket_history";
export const createPartyRoute = "/lookup/";

// Delete By Id
export const deleteStatesByIdRoute = "/states/";

// Update By Id
export const updateTicketStatusRoute = "/updateticketstatus";
export const updateStatesByIdRoute = "/states/";
export const saveOrupdatedSurvey = "/save_or_updated_survey";
// export const saveOrupdatedSurvey = "/saveorupdatedsurveynew2";
export const updateMandalByIdRoute = "/mandals/";
export const updateDivisionByIdRoute = "/divisions/";
export const designationMappingRoute = "/designationmappingtousers";
export const sendCredsToUsersRoute = "/sendcredstousers";
export const UpdateAndDeleteConstituenciesRoute = "/constituencies/";
export const updateAndDeleteSachivalayam = "/sachivalayam/";
// export const postRequest = (route, data) => {
//   let user = LsService.getCurrentUser();
//   var accesstoken = user.user_pk;

//   return instance.post(route, data, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accesstoken}`,
//     },
//   });
// };
