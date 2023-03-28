import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@material-ui/icons';
import { Button } from './Button';
import { useTranslation } from "react-i18next";

export const BookmarkList = () => {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const { t } = useTranslation();
  const menuOpen = Boolean(anchorMenu);
  const handleClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  return (
    <>
      <div className='table-header'>
        <ul className='tab-menu'>
          <li className='active'>{t("sortAlphabet")}</li>
          <li>{t("sortRegistration")}</li>
        </ul>
        <div className='check-del'>
          <Button type="primary" text={`${t("selectionDelete")}`}/>
        </div>
        {/* <div>
          <select defaultValue="enter" name="" id="">
            <option value="name">가나다순</option>
            <option value="enter">등록일순</option>
            <option value="expire">만료일순</option>
          </select>
        </div> */}
      </div>
      <div>
        <div className='list'>
          <div className='list__info'>
            <input type="checkbox" />
            <h3 className='item-name ml8 mb4'>제품명</h3>
          </div>
          <div className='list__btn'>
            <Button type="secondary" text={`${t("modification")}`}/>
            <Button type="secondary" text={`${t("delete")}`}/>
            {/* <IconButton
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
              <MenuItem>수정</MenuItem>
              <MenuItem>삭제</MenuItem>
            </Menu> */}
          </div>
        </div>
      </div>
      {/* <div className='no-regist'>
        <p>
          등록된 제품이 없습니다.
          아래 버튼을 클릭하여 추가해주세요.
        </p>
      </div> */}
    </>
  )
}
