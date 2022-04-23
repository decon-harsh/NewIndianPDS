import React from 'react'
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from "../routes";

function Header() {
  return (
      <Menu style={{marginTop:"25px"}}>
        <Link route="/">
          <a className="item">
          Indian PDS
          </a>
        </Link>

        <Link route="/govtprov">
          <a className="item">
          Government Provenance
          </a>
        </Link>

        <Link route="/update">
          <a className="item">
          Update Seller Stocks
          </a>
        </Link>

      </Menu>
    );
};

export default Header;
