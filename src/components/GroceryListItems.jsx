import React, { useState } from 'react'
import { RegistModal } from '../pages/Regist.page';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@material-ui/icons';
import { useTranslation } from "react-i18next";

export const GroceryListItems = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = () => setModalOpen(!modalOpen);
  const { t } = useTranslation();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const menuOpen = Boolean(anchorMenu);
  const handleClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };


  return (
    <>
      <div className='list'>
        <div className='list__info'>
          <h3 className='item-name mb4'>제품명</h3>
          <p className='item-day'>2023.03.13 ~ 2023.03.24</p>
        </div>
        <div className='list__d-day'>D-3</div>
        <div className='list__more'>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={menuOpen ? 'long-menu' : undefined}
            aria-expanded={menuOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorMenu}
            open={menuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              style: { width: '80px' },
            }}
          >
            <MenuItem onClick={handleModal}>{t("modification")}</MenuItem>
            <MenuItem>{t("delete")}</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  )
}
