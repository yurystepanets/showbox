import React from 'react';
import bridge from "@vkontakte/vk-bridge";
import {Avatar, Button, Cell, Group, Text, Spinner, Placeholder} from "@vkontakte/vkui";
import { Icon56ErrorTriangleOutline } from '@vkontakte/icons';

import style from './Group.scss';

interface IProps {
  changeStep(id: number, type: 'group' | 'user')
}

interface IState {
  groups: Array<{
    id: number,
    type: 'group' | 'user',
    name: string,
    closed: boolean,
    checked: boolean,
    photo: string,
    activity?: string
  }> | null,
  activeGroup: null | number,
  error: null | string
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      groups: null,
      activeGroup: null,
      error: null
    };
  }

  componentDidMount() {
    this.getTokenWithGroups();
  }

  async getTokenWithGroups() {
    // App ID - 7826637
    try {
      // Get user token
      const { access_token } = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7826637, "scope": "groups"});

      // Get user groups ids
      const groupsIds = await bridge.send("VKWebAppCallAPIMethod", {
        "method": "groups.get",
        "params": {
          "v": "5.130",
          "filter": "admin",
          "access_token": access_token
        }
      });

      // Get groups info
      const groups = await bridge.send("VKWebAppCallAPIMethod", {
        "method": "groups.getById",
        "params": {
          "group_ids": groupsIds.response.items.join(','),
          "fields": "activity",
          "v": "5.130",
          "access_token": access_token
        }
      });

      // Get current user info
      const user = await bridge.send("VKWebAppGetUserInfo");

      this.setState({
        groups: [
          {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            type: 'group',
            closed: false,
            checked: false,
            photo: user.photo_100
          },
          ...groups.response.map((item) => ({
            id: item.id,
            name: item.name,
            type: 'user',
            closed: item.is_closed,
            checked: false,
            photo: item.photo_100,
            activity: item.activity
          }))
        ]
      });
    } catch (e) {
      this.setState({
        error: 'Произошла ошибки при получении токена, попробуйте еще раз'
      });
    }
  }

  selectGroup(index: number) {
    const { groups, activeGroup } = this.state;
    let newGroups = [...groups];

    if (activeGroup !== null) {
      newGroups[activeGroup].checked = false;
    }

    newGroups[index].checked = true;

    this.setState({
      groups: newGroups,
      activeGroup: index
    });
  }

  render() {
    const { changeStep } = this.props;
    const { groups, activeGroup, error } = this.state;

    return (
      <div className={style.block}>
        <Text weight="medium">Выберите вашу страницу или одну группу Вконтакте, из которой мы будем загружать фото ваших товаров в ШоуБокс</Text>
        <Group className={style.groups}>
          {!error ? (
            groups ? (
              groups.map((item, index) => (
                <Cell
                  key={index}
                  before={<Avatar src={item.photo} />}
                  description={item.activity}
                  disabled={item.closed}
                  checked={item.checked}
                  onChange={() => this.selectGroup(index)}
                  selectable
                  multiline
                >
                  {item.name}
                </Cell>
              ))
            ) : <Spinner className={style.spinner} />
          ) : (
            <Placeholder
              icon={<Icon56ErrorTriangleOutline />}
              action={<Button size="m">Повторить</Button>}
              onClick={() => this.getTokenWithGroups()}
            >
              {error}
            </Placeholder>
          )}
        </Group>
        {groups && (
          <Button
            className={style.button}
            size="m"
            disabled={activeGroup === null}
            onClick={() => changeStep(groups[activeGroup].id, groups[activeGroup].type)}
          >
            Продолжить
          </Button>
        )}
      </div>
    );
  }
}
