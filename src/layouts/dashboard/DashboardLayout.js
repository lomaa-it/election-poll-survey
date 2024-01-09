import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Header from "./header";
import Nav from "./nav";
import { connect } from "react-redux";
import { getAllCommonData } from "../../actions/common";
import { useAlertContext } from "../../components/AlertProvider";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const DashboardLayout = ({ account, getAllCommonData }) => {
  const [open, setOpen] = useState(false);
  const { showLoading, hideLoading } = useAlertContext();

  useEffect(() => {
    getFiltersData();
  }, []);

  const getFiltersData = async () => {
    showLoading();
    await getAllCommonData(account?.user);
    hideLoading();
  };

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapStateToProps, { getAllCommonData })(DashboardLayout);
