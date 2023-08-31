import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CopiedToClip from '../CopiedToClip';
import { useSelector } from "react-redux";
import ConfirmPop from './ConfirmPop';
import { WEBSITE_DOMAIN } from '../../utilities/websiteUrls.ts';
import { organizationUser } from '../../utilities/common';

const MoreButton = ({ handleClick, open, handleClose, anchorEl, singleDelete, seteditEvent, event }) => {
  const theme = useSelector(state => state.theme.themeData)

  const permissions = useSelector((state) => state.permissions);

  // copy toast

  const [state, setState] = React.useState({
    openCopyToast: false,
    vertical: "top",
    horizontal: "center",
  });

  // const { vertical, horizontal, openCopyToast } = state;

  const handleClickCopy = (newState) => () => {
    setState({ openCopyToast: true, ...newState });
  };

  const handleCloseCopy = () => {
    setState({ ...state, openCopyToast: false });
  }; //confirm popup

  const [confirm, setConfirm] = React.useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };


  return (
    <>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          width: "25px",
          height: "25px",
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          backgroundColor: theme?.selectimage?.backgroundcolor1,

        }}
        className="moreGridButton"
      >
        <img alt="" src="/assets/bottomIcons/more.svg" className="dotIcon" />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme?.selectimage?.backgroundcolor,

          },
        }}
        style={{ marginTop: "12px" }}
      >
        {organizationUser(permissions.edit_space) && (
          <MenuItem
            onClick={() => {
              seteditEvent(true);
              setTimeout(() => {
                handleClose();
              }, 50);
            }}
            style={{
              paddingRight: "45px",
              color: "#88A1AB",
              fontFamily: "URW DIN REGULAR",
            }}
          >
            <img
              src="/assets/admin/edit-grid.svg"
              alt=""
              style={{ paddingRight: "18px" }}
            />
            Edit
          </MenuItem>
        )}
        {organizationUser(permissions.delete_space) && (
          <MenuItem
            onClick={handleClickOpen}
            style={{
              paddingRight: "45px",
              borderColor: "#012243",
              color: "#88A1AB",
              fontFamily: "URW DIN REGULAR",
            }}
          >
            <img
              src="/assets/admin/delete-grid.svg"
              alt=""
              style={{ paddingRight: "20px", width: "15px", height: "15px" }}
            />
            Delete
          </MenuItem>
        )}
        {organizationUser(permissions.can_share_spaces) && (
          <div
            onClick={() => {
              event.is_lobby
                ? navigator.clipboard.writeText(
                  `${WEBSITE_DOMAIN}lobby/${event.slug}`
                )
                : navigator.clipboard.writeText(
                  `${WEBSITE_DOMAIN}${event.slug}/${event.slug}`
                );
            }}
          >
            <MenuItem
              onClick={handleClickCopy({
                vertical: "bottom",
                horizontal: "center",
              })}
              style={{
                paddingRight: "45px",
                borderColor: "#012243",
                color: "#88A1AB",
                fontFamily: "URW DIN REGULAR",
              }}
            >
              <img
                src="/assets/admin/link-grid.svg"
                alt=""
                style={{ paddingRight: "17px" }}
              />
              Share
            </MenuItem>
          </div>
        )}
      </Menu>
      <CopiedToClip state={state} handleClose={handleCloseCopy} />

      <ConfirmPop
        message="Are you sure you want to delete? "
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={singleDelete}
      />
    </>
  );
}

export default MoreButton