import React from 'react';
import bridge from "@vkontakte/vk-bridge";
import {Placeholder, Button} from "@vkontakte/vkui";
import { Icon56CheckCircleOutline } from '@vkontakte/icons';

import style from "./Finish.scss";

export default () => {
  return (
    <Placeholder
      className={style.placeholder}
      icon={<Icon56CheckCircleOutline />}
      title="Страница подключена"
      action={<Button size="m" onClick={() => bridge.send("VKWebAppClose", {"status": "success"})}>Закрыть</Button>}
    >
      <div>Вы успешно подключили сообщество ВКонтакте к аккаунту в ШоуБокс</div>
    </Placeholder>
  );
}
