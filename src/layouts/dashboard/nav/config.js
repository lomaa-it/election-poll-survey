import Iconify from "../../../components/Iconify";
import LsService from "../../../services/localstorage";

const user = LsService.getCurrentUser();
console.log("user123", user);
const userPermission = user && user.permissions ? user.permissions : [];

console.log("userPermission", userPermission);

const userNavConfig = [
  {
    title: "Opinion Survey",
    path: "/user/opinionsurvey/survey",
    icon: <Iconify icon="ic:round-dashboard" width="24px" height="24px" />,
  },
  {
    title: "View Tickets",
    path: "/user/tickets",
    icon: <Iconify icon="ion:ticket" width="24px" height="24px" />,
  },
  {
    title: "Add Voter",
    path: "/user/voter-registration",
    icon: <Iconify icon="formkit:people" width="24px" height="24px" />,
  },
];

const operatorNavConfig = [
  {
    title: "User Management",
    path: "/user-management",
    icon: <Iconify icon="ic:baseline-people" width="24px" height="24px" />,
    children: [
      {
        title: "View User",
        path: "/user-management/view-user",
      },
      {
        title: "Add User",
        path: "/user-management/user-registration",
      },
    ],
  },
  {
    title: "Voter Management",
    path: "/reports",
    icon: <Iconify icon="formkit:people" width="24px" height="24px" />,
    children: [
      {
        title: "View Voter",
        path: "/view-voter",
      },
      {
        title: "Add Voter",
        path: "/voter-registration",
      },
    ],
  },
  {
    title: "Parts",
    path: "/parts",
    icon: <Iconify icon="formkit:people" width="24px" height="24px" />,
  },
];

// const otherNavConfig = [
//   {
//     title: "Opinion Survey",
//     path: "/user/opinionsurvey/survey",
//     icon: <Iconify icon="ic:round-dashboard" width="24px" height="24px" />,
//   },
//   {
//     title: "View Tickets",
//     path: "/user/tickets",
//     icon: <Iconify icon="ion:ticket" width="24px" height="24px" />,
//   },
// ];

const mlaNavConfig = [
  {
    title: "Survey Dashboard",
    path: "/dashboard",
    icon: <Iconify icon="ic:round-dashboard" width="24px" height="24px" />,
  },
  // {
  //   title: "Voting Poll Dashboard",
  //   path: "/voting-poll-dashboard",
  //   icon: <Iconify icon="ic:round-dashboard" width="24px" height="24px" />,
  // },
  {
    title: "Opinion Survey ",
    path: "/opinionsurvey",
    icon: <Iconify icon="mdi:report-box-outline" width="24px" height="24px" />,
    children: [
      {
        title: "Opinion Survey",
        path: "/opinionsurvey/survey",
        icon: <Iconify icon="ic:round-person" width="24px" height="24px" />,
      },
      // {
      //   title: "Opinion Results",
      //   path: "/opinionsurvey/results",
      //   icon: <Iconify icon="ic:round-person" width="24px" height="24px" />,
      // },
      {
        title: "Opinion Reports",
        path: "/opinionsurvey/reports",
      },
    ],
  },

  // Voting Poll Survey with Sub Menu
  // {
  //   title: "Voting Poll Survey ",
  //   path: "/voting-poll-survey",
  //   icon: <Iconify icon="mdi:vote" width="24px" height="24px" />,
  //   children: [
  //     {
  //       title: "Voting Poll Survey",
  //       path: "/voting-poll-survey/survey",
  //       icon: <Iconify icon="ic:round-person" width="24px" height="24px" />,
  //     },
  //     {
  //       title: "Voting Poll Results",
  //       path: "/voting-poll-survey/results",
  //       icon: <Iconify icon="ic:round-person" width="24px" height="24px" />,
  //     },
  //     {
  //       title: "Voting Poll Reports",
  //       path: "/voting-poll-survey/reports",
  //     },
  //     // {
  //     //   title: "Voting polling reports",
  //     //   path: "voting-polling-reports",
  //     // },
  //     {
  //       title: "Report by Survey and Voting Reason",
  //       path: "/voting-poll-survey/report-by-survey-and-voting-reason",
  //     },
  //     // {
  //     //   title: "Voting Poll Results",
  //     //   path: "voting-poll-results",
  //     // },
  //     // {
  //     //   title: "Results by District",
  //     //   path: "polling-results-by-state",
  //     // },
  //   ],
  // },

  // {
  //   title: "Voters",
  //   path: "/voters",
  //   icon: (
  //     <Iconify icon="fluent:person-edit-20-filled" width="24px" height="24px" />
  //   ),
  // },

  // User Management with Sub Menu
  {
    title: "User Management",
    path: "/user-management",
    icon: <Iconify icon="ic:baseline-people" width="24px" height="24px" />,
    children: [
      {
        title: "View User",
        path: "/user-management/view-user",
      },
      {
        title: "Add User",
        path: "/user-management/user-registration",
      },
    ],
  },
  {
    title: "Access Management",
    path: "/access-management",
    icon: <Iconify icon="uis:lock-access" width="24px" height="24px" />,
  },
  // Voter Management with Sub Menu
  // {
  //   title: "Voter Management",
  //   path: "/reports",
  //   icon: <Iconify icon="formkit:people" width="24px" height="24px" />,
  //   children: [
  //     {
  //       title: "View Voter",
  //       path: "/view-voter",
  //     },
  //     // {
  //     //   title: "Add Voter",
  //     //   path: "/voter-registration",
  //     // },
  //   ],
  // },
  {
    title: "Ticket Management",
    path: "/reports",
    icon: <Iconify icon="ion:ticket" width="24px" height="24px" />,
    children: [
      {
        title: "View Tickets",
        path: "/tickets",
      },
    ],
  },

  // {
  //   title: "Admin",
  //   path: "/admin",
  //   icon: <Iconify icon="ri:admin-fill" width="24px" height="24px" />,
  // },
  // {
  //   title: "Reports",
  //   path: "/reports",
  //   icon: <Iconify icon="mdi:report-box-outline" width="24px" height="24px" />,
  //   children: [
  //     {
  //       title: "survey reports",
  //       path: "/reports/survey",
  //     },
  //   ],
  // },
  {
    title: "Configuration",
    path: "/reports",
    icon: <Iconify icon="ri:mind-map" width="24px" height="24px" />,
    children: [
      // {
      //   title: "Voter and Volunteer Mapping",
      //   path: "/voter-and-volunteer-mapping",
      // },
      {
        title: "User Mapping",
        path: "/user-mapping",
      },
    ],
  },
  {
    title: "Administration",
    path: "/admin",
    icon: <Iconify icon="eos-icons:admin" width="24px" height="24px" />,
    children: [
      {
        title: "Designations",
        path: "/designations",
      },
      {
        title: "Political Parties",
        path: "/parties",
      },
      // {
      //   title: "States",
      //   path: "/states",
      //   icon: <Iconify icon="bi:building" width="24px" height="24px" />,
      // },
      {
        title: "Districts",
        path: "/districts",
      },
      {
        title: "Constituencies",
        path: "/constituencies",
      },

      {
        title: "Mandals",
        path: "/mandals",
      },
      {
        title: "Divisions",
        path: "/divisions",
      },
      {
        title: "Sachivalayam",
        path: "/sachivalayam",
      },
      {
        title: "Parts",
        path: "/parts",
      },
      {
        title: "Villages",
        path: "/villages",
      },
    ],
  },
  // {
  //   title: "Logout",
  //   path: "/login",
  //   icon: <Iconify icon="ic:round-logout" width="24px" height="24px" />,
  // },
];

// main one
const adminNavConfig = [
  {
    title: "Survey Dashboard",
    path: "/dashboard",
    icon: <Iconify icon="ic:round-dashboard" width="24px" height="24px" />,
  },
  {
    title: "Opinion Survey ",
    path: "/opinionsurvey",
    icon: <Iconify icon="mdi:report-box-outline" width="24px" height="24px" />,
    children: [
      {
        title: "Opinion Survey",
        path: "/opinionsurvey/survey",
        icon: <Iconify icon="ic:round-person" width="24px" height="24px" />,
      },
      {
        title: "Opinion Results",
        path: "/opinionsurvey/results",
        icon: <Iconify icon="ic:round-person" width="24px" height="24px" />,
      },
      {
        title: "Opinion Reports",
        path: "/opinionsurvey/reports",
      },
    ],
  },

  {
    title: "User Management",
    path: "/user-management",
    icon: <Iconify icon="ic:baseline-people" width="24px" height="24px" />,
    children: [
      {
        title: "View User",
        path: "/user-management/view-user",
      },
      {
        title: "Add User",
        path: "/user-management/user-registration",
      },
    ],
  },
  {
    title: "Voter Management",
    path: "/reports",
    icon: <Iconify icon="formkit:people" width="24px" height="24px" />,
    children: [
      {
        title: "View Voter",
        path: "/view-voter",
      },
      {
        title: "Add Voter",
        path: "/voter-registration",
      },
    ],
  },
  {
    title: "Ticket Management",
    path: "/reports",
    icon: <Iconify icon="ion:ticket" width="24px" height="24px" />,
    children: [
      {
        title: "View Tickets",
        path: "/tickets",
      },
    ],
  },
  {
    title: "Configuration",
    path: "/reports",
    icon: <Iconify icon="ri:mind-map" width="24px" height="24px" />,
    children: [
      {
        title: "User Mapping",
        path: "/user-mapping",
      },
    ],
  },
  {
    title: "Administration",
    path: "/admin",
    icon: <Iconify icon="eos-icons:admin" width="24px" height="24px" />,
    children: [
      {
        title: "Parts",
        path: "/parts",
      },
    ],
  },
];

let isOpinionSurveyMenuRendered = false;
let opinionSurveyMenu = {
  title: "Opinion Survey ",
  path: "/opinionsurvey",
  icon: <Iconify icon="mdi:report-box-outline" width="24px" height="24px" />,
  children: [],
};

let isUserManagementMenuRendered = false;
let userManagementMenu = {
  title: "User Management",
  path: "/user-management",
  icon: <Iconify icon="ic:baseline-people" width="24px" height="24px" />,
  children: [],
};

let isVoterManagementMenuRendered = false;
let voterManagementMenu = {
  title: "Voter Management",
  path: "/reports",
  icon: <Iconify icon="formkit:people" width="24px" height="24px" />,
  children: [],
};

let isTicketManagementMenuRendered = false;
let ticketManagementMenu = {
  title: "Ticket Management",
  path: "/reports",
  icon: <Iconify icon="ion:ticket" width="24px" height="24px" />,
  children: [],
};

let isConfigurationMenuRendered = false;
let configurationMenu = {
  title: "Configuration",
  path: "/reports",
  icon: <Iconify icon="ri:mind-map" width="24px" height="24px" />,
  children: [],
};

let isAdministrationMenuRendered = false;
let administrationMenu = {
  title: "Administration",
  path: "/admin",
  icon: <Iconify icon="eos-icons:admin" width="24px" height="24px" />,
  children: [],
};

const accessNavConfig = userPermission
  .map((item) => {
    console.log("item", item);
    if (item.page_access == 1 && item.page_id == 113) {
      return {
        title: "Survey Dashboard",
        path: "/dashboard",
        icon: <Iconify icon="ic:round-dashboard" width="24px" height="24px" />,
      };
    }
    if (item.page_access == 1 && item.page_id == 114) {
      opinionSurveyMenu.children.push({
        title: "Opinion Survey",
        path: "/opinionsurvey/survey",
        icon: <Iconify icon="ic:round-person" width="24px" height="24px" />,
      });

      if (!isOpinionSurveyMenuRendered) {
        isOpinionSurveyMenuRendered = true;
        return opinionSurveyMenu;
      }
    }
    if (item.page_access == 1 && item.page_id == 136) {
      opinionSurveyMenu.children.push({
        title: "Opinion Reports",
        path: "/opinionsurvey/reports",
      });

      if (!isOpinionSurveyMenuRendered) {
        isOpinionSurveyMenuRendered = true;
        return opinionSurveyMenu;
      }
    }
    if (item.page_access == 1 && item.page_id == 135) {
      userManagementMenu.children.push({
        title: "View User",
        path: "/user-management/view-user",
      });

      if (!isUserManagementMenuRendered) {
        isUserManagementMenuRendered = true;
        return userManagementMenu;
      }
    }
    if (item.page_access == 1 && item.page_id == 134) {
      userManagementMenu.children.push({
        title: "Add User",
        path: "/user-management/user-registration",
      });

      if (!isUserManagementMenuRendered) {
        isUserManagementMenuRendered = true;
        return userManagementMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 115) {
      voterManagementMenu.children.push({
        title: "Add Voter",
        path: "/voter-registration",
      });

      if (!isVoterManagementMenuRendered) {
        isVoterManagementMenuRendered = true;
        return voterManagementMenu;
      }
    }
    if (item.page_access == 1 && item.page_id == 139) {
      voterManagementMenu.children.push({
        title: "View Voter",
        path: "/view-voter",
      });

      if (!isVoterManagementMenuRendered) {
        isVoterManagementMenuRendered = true;
        return voterManagementMenu;
      }
    }
    if (item.page_access == 1 && item.page_id == 137) {
      return {
        title: "Access Management",
        path: "/access-management",
        icon: <Iconify icon="uis:lock-access" width="24px" height="24px" />,
      };
    }

    if (item.page_access == 1 && item.page_id == 140) {
      ticketManagementMenu.children.push({
        title: "View Tickets",
        path: "/tickets",
      });

      if (!isTicketManagementMenuRendered) {
        isTicketManagementMenuRendered = true;
        return ticketManagementMenu;
      }
    }
    if (item.page_access == 1 && item.page_id == 138) {
      configurationMenu.children.push({
        title: "User Mapping",
        path: "/user-mapping",
      });

      if (!isConfigurationMenuRendered) {
        isConfigurationMenuRendered = true;
        return configurationMenu;
      }
    }
    if (item.page_access == 1 && item.page_id == 141) {
      administrationMenu.children.push({
        title: "Designations",
        path: "/designations",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 142) {
      administrationMenu.children.push({
        title: "Political Parties",
        path: "/parties",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 143) {
      administrationMenu.children.push({
        title: "Districts",
        path: "/districts",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 144) {
      administrationMenu.children.push({
        title: "Constituencies",
        path: "/constituencies",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 145) {
      administrationMenu.children.push({
        title: "Mandals",
        path: "/mandals",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 146) {
      administrationMenu.children.push({
        title: "Divisions",
        path: "/divisions",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 147) {
      administrationMenu.children.push({
        title: "Sachivalayam",
        path: "/sachivalayam",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 148) {
      administrationMenu.children.push({
        title: "Parts",
        path: "/parts",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    if (item.page_access == 1 && item.page_id == 149) {
      administrationMenu.children.push({
        title: "Villages",
        path: "/villages",
      });

      if (!isAdministrationMenuRendered) {
        isAdministrationMenuRendered = true;
        return administrationMenu;
      }
    }

    return {
      title: "",
    };
  })
  .filter((item) => item.title !== "");

console.log("accessNavConfig", accessNavConfig);

export { userNavConfig, operatorNavConfig, mlaNavConfig, adminNavConfig, accessNavConfig };
