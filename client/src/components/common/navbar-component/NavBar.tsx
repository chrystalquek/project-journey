import { AppBar, Toolbar } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { reset } from "@redux/reducers/loading";
import { useIsMobile } from "@utils/helpers/layout";
import React from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

function NavBar() {
  const isMobile = useIsMobile();

  const userData = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  dispatch(reset());

  return (
    <AppBar elevation={0} position="static" color="transparent">
      <Toolbar>
        {isMobile ? (
          <MobileNavBar userData={userData} />
        ) : (
          <DesktopNavBar userData={userData} />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
