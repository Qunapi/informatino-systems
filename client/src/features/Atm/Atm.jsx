import { useState } from "react";
import { NavBar } from "../../common/Common";
import { AtmAuth } from "./AtmAuth/AtmAuth";
import { AtmInfo } from "./AtmInfo/AtmInfo";

// const DEFAULT_CARD = { CardNumber: 4467603566242576, CardPassword: 6241 };

export const Atm = () => {
  const [authInfo, setAuthInfo] = useState();

  return (
    <div>
      <NavBar />
      {authInfo ? (
        <AtmInfo authInfo={authInfo} />
      ) : (
        <AtmAuth setAuthInfo={setAuthInfo} />
      )}
    </div>
  );
};
