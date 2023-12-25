// export const baseServerUrl = "http://localhost:8080";
// export const baseServerUrl = "https://poll-7ks0.onrender.com";
// export const baseServerUrl = "https://cd30-123-201-175-198.ngrok-free.app";

// new api for baseServerUrl
// export const baseServerUrl = "https://940b-219-91-202-227.ngrok-free.app";

// export const baseServerUrl = "https://6cd2-183-83-253-245.ngrok-free.app";
// export const baseServerUrl = "https://backend.cgrysrcongress.in";/
// export const baseServerUrl = "http://192.168.137.220:8080";
/// new
// export const baseServerUrl = "https://poll2.onrender.com";
export const baseServerUrl = "http://192.168.0.102:8080";

// Survey Dashboard Apis
export const getDashBoardbyTotalVoters = "/getdashboardbytotalvoters";
export const getDashBoardbyGenderCount = "/getdashboardbygendercount";
export const getDashBoardbyStatusCount = "/getdashboardbystatuscount";
export const getDashBoardbyVoterPulse = "/getdashboardbyvoterpulse";
export const getDashBoardbyTicketStatus = "/getdashboardbyticketstatus";
export const getDashBoardbyCasteCount = "/getdashboardbycastecount";
export const getDashBoardbyReligionCount = "/getdashboardbyreligioncount";
export const getDashBoardbyDisabilityCount = "/getdashboardbydisabilitycount";
export const getDashBoardbyGovtEmployeeCount =
  "/getdashboardbygovtemployeecount";
export const getDashBoardbyResidentialStatus =
  "/getdashboardbyresidentialstatus";
export const getDashBoardbyageGroup = "/getdashboardbyagegroup";
export const getDashBoardbyTicketbarChart = "/getdashboardbyticketbarchart";

/// View User
export const deleteUserById = "/users/";

// Add Voters
export const addVoters = "/voters";

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

// Delete By Id
export const deleteStatesByIdRoute = "/states/";

// Update By Id
export const updateTicketStatusRoute = "/updateticketstatus";
export const updateStatesByIdRoute = "/states/";
export const saveOrupdatedSurvey = "/save_or_updated_survey";
export const updateMandalByIdRoute = "/mandals/";
export const updateDivisionByIdRoute = "/divisions/";
export const designationMappingRoute = "/designationmappingtousers";
export const sendCredsToUsersRoute = "/sendcredstousers";
