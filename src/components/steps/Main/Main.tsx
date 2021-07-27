import React from "react";
import {Button, Caption, Text} from "@vkontakte/vkui";

import style from './Main.scss';

interface IProps {
  changeStep: Function
}

export default (props: IProps) => {
  return (
    <div className={style.block}>
      <Text weight="medium">Это приложение предназначено для подключения вашей личной страницы или группы ВКонтакте к вашему аккаунту в ШоуБокс</Text>
      <Caption className={style.description} level="1" weight="regular">Чтобы выбрать страницу или группу - нажмите «Начать» и дайте нам разрешение увидеть список ваших групп</Caption>
      <Button
        className={style.button}
        size="m"
        onClick={() => props.changeStep()}
      >
        Начать
      </Button>
    </div>
  )
}
