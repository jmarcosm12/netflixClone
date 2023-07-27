import React from "react";
import "./Header.css";

export default ({black}) => {
  return (
    <header className={black ? 'black': ''}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://logopng.com.br/logos/netflix-94.svg"
            alt="netflix"
          />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img
            src="https://i.pinimg.com/564x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg"
            alt="user"
          />
        </a>
      </div>
    </header>
  );
};
