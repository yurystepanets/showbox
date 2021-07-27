import React from "react";
import {Caption} from "@vkontakte/vkui";

import style from "./Support.scss";

import WhatsappImg from "src/img/whatsapp.svg";

export default () => {
  return (
    <div className={style.support}>
      <Caption level="1" weight="regular">Служба поддержки ШоуБокс</Caption>
      <a href="https://wa.me/79539070078" target="_blank">
        <Caption level="1" weight="medium">
          <img src={WhatsappImg} alt="" />
          <span>+7 953 907-00-78</span>
        </Caption>
      </a>
    </div>
  );
}
