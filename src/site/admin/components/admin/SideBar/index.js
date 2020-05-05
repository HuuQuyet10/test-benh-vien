import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { connect } from "react-redux";
import ItemMenu from "../ItemMenu";
import $ from "jquery";
function index(props) {
  const menus = useRef(null);
  console.log(props.auth);
  const [state, _setState] = useState({
    show: false,
    // menus: getMenu()
  });

  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const getMenu = () => {
    let allMenus = [
      {
        userType: ["co_so_y_te", "bo_y_te", "cong_ty", "so_y_te", "vu_ttb"],
        href: "/admin/dashboard",
        i18n: "nav.dashboard",
        name: "Dashboard",
        icon: "fal fa-game-board-alt",
        filter: "dashboard tổng quan",
      },
      {
        userType: ["bo_y_te", "so_y_te", "vu_ttb"],
        href: "#",
        i18n: "nav.user",
        name: "Quản lý tài khoản",
        icon: "fal fa-users",
        filter: "quan ly tai khoan",
        menus: [
          {
            href: "/admin/user-type",
            name: "Quản lý loại tài khoản",
            i18n: "nav.user-type",
          },
          {
            href: "/admin/user",
            name: "Quản lý tài khoản",
            i18n: "nav.user",
          },
        ],
      },
    ]
    return allMenus.filter(item => {
      if (!(item.userType || []).length)
        return true;
      for (let i = 0; i < item.userType.length; i++) {
        if (item.userType[i] == (props.auth.authorities && props.auth.authorities.length && props.auth.authorities[0])) {
          return true;
        }
      }
    })
  }
  useEffect(() => {
    try {
      window.initApp.listFilter(
        $("#js-nav-menu"),
        $("#nav_filter_input"),
        $("#js-primary-nav")
      );
    } catch (error) { }
  });
  useEffect(() => {
    setState({ menus: getMenu() })
    if (menus.current) {
      setState({ menus: menus.current });
    }
  }, []);
  const toggle = (item) => {
    item.open = !item.open;
    menus.current = [...state.menus];
    setState({ menus: menus.current });
  };
  return (
    <aside className="page-sidebar list-filter-active">
      <div
        className="page-logo"
        style={{ backgroundColor: "#FFF", padding: 0, height: 80 }}
      >
        <a
          href="#"
          className={`page-logo-link 
          press-scale-down 
          d-flex align-items-center position-relative`}
          // data-toggle="modal"
          // data-target="#modal-shortcut"
          style={{ padding: 5, width: "65%" }}
        >
          <img
            src={require("@images/logobyt.png")}
            alt="iSofH"
            style={{ maxHeight: 70, maxWidth: "95%" }}
            aria-roledescription="logo"
          />
          {/* <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
          <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i> */}
        </a>
        <a
          href="#"
          className={`page-logo-link 
          press-scale-down 
          d-flex align-items-center position-relative`}
          // data-toggle="modal"
          // data-target="#modal-shortcut"
          style={{ padding: 5, width: "35%" }}
        >
          <img
            src={require("@images/logo.png")}
            alt="iSofH"
            style={{ maxHeight: 70, maxWidth: "98%" }}
            aria-roledescription="logo"
          />
          {/* <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
          <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i> */}
        </a>
      </div>
      <nav
        id="js-primary-nav"
        className="primary-nav js-list-filter"
        role="navigation"
      >
        <div className="nav-filter">
          <div className="position-relative">
            <input
              type="text"
              id="nav_filter_input"
              placeholder="Tìm kiếm tính năng"
              className="form-control"
              tabIndex="0"
            />
            <a
              href="#"
              onClick={() => {
                return false;
              }}
              className="btn-primary btn-search-close js-waves-off"
              data-action="toggle"
              data-class="list-filter-active"
              data-target=".page-sidebar"
            >
              <i className="fal fa-chevron-up"></i>
            </a>
          </div>
        </div>
        <div className="info-card">
          <img
            src="/img/demo/avatars/avatar-admin.png"
            className="profile-image rounded-circle"
            alt={props.auth.full_name}
          />
          <div className="info-card-text">
            <a href="#" className="d-flex align-items-center text-white">
              <span className="text-truncate text-truncate-sm d-inline-block">
                {props.auth.full_name}
              </span>
            </a>
            {props.auth.email && (
              <span className="d-inline-block text-truncate text-truncate-sm">
                {props.auth.email}
              </span>
            )}
          </div>
          <img
            src="/img/card-backgrounds/cover-2-lg.png"
            className="cover"
            alt="cover"
          />
          <a
            href="#"
            onClick={() => {
              return false;
            }}
            className="pull-trigger-btn"
            data-action="toggle"
            data-class="list-filter-active"
            data-target=".page-sidebar"
            data-focus="nav_filter_input"
          >
            <i className="fal fa-angle-down"></i>
          </a>
        </div>
        <ul id="js-nav-menu" className="nav-menu">
          {state.menus && state.menus.length && state.menus.map((item, index) => {
            // if (item.authorities) {
            // props.auth.authorities.map(item1 => {
            //   if (item.authorities == item1) {
            //     return <ItemMenu key={index} item={item} toggle={toggle} />;
            //   }
            // })
            // } else {
            return <ItemMenu key={index} item={item} toggle={toggle} />;
            // }
          })}
        </ul>
        <div className="filter-message js-filter-message bg-success-600"></div>
      </nav>
      <div className="nav-footer shadow-top">
        <a
          href="#"
          onClick={() => {
            return false;
          }}
          data-action="toggle"
          data-class="nav-function-minify"
          className="hidden-md-down"
        >
          <i className="ni ni-chevron-right"></i>
          <i className="ni ni-chevron-right"></i>
        </a>
        <ul className="list-table m-auto nav-footer-buttons"></ul>
      </div>
    </aside>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
  };
}

export default connect(mapStateToProps)(index);
