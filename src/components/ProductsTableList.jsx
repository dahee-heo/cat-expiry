import React, { useState } from 'react'
import { RegistModal } from '../pages/Regist.page';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@material-ui/icons';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

export const ProductsTableList = ({ data, handleDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const { t } = useTranslation();
  
  const handleModal = () => setModalOpen(!modalOpen);
  const menuOpen = Boolean(anchorMenu);
  
  const handleClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const dayConvert = ( day ) => {
    return Math.ceil(( day ) / ( 1000 * 60 * 60 * 24 ))
  }
  const now = new Date();
  const expire = new Date(data.expire)
  const dday = dayConvert(expire.getTime() - now)
  
  const onDelete = (key) => {
    handleDelete(key);
    handleMenuClose()
  }
  

  return (
    <>
      <div className='list'>
        <div className='list__info'>
          <h3 className='item-name mb4'>{data.name}</h3>
          <p className='item-day'>{data.enter} ~ {data.expire}</p>
        </div>
        <div 
          className={`list__d-day ${dday <= 7 && "impending"}`}
        >{dday >= 0 ? `D-${dday}` : `D+${Math.abs(dday)}`}</div>
        { window.location.pathname === "/products" && (
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
                <Link to={`/edit/${data.key}`}><MenuItem onClick={handleModal}>{t("modification")}</MenuItem></Link>
                <MenuItem onClick={() => onDelete(data.key)}>{t("delete")}</MenuItem>
              </Menu>
            </div>
          )}
      </div>
    </>
  )
}
