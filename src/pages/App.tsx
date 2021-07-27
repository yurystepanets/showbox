import React from 'react';
import bridge from "@vkontakte/vk-bridge";
import {AdaptivityProvider, Appearance, AppRoot, ConfigProvider, Root, Scheme} from '@vkontakte/vkui';

import {MainView} from "src/views";

import '../styles/all.scss';

interface IProps {}

interface IState {
  scheme: Scheme
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      scheme: Scheme.BRIGHT_LIGHT
    }
  }

  componentDidMount() {
    bridge.subscribe(async ({ detail: { type, data } }: any) => {
      if (type === 'VKWebAppUpdateConfig') {
        let scheme = Scheme.BRIGHT_LIGHT;

        if (data.scheme === Scheme.BRIGHT_LIGHT || data.scheme === Scheme.DEPRECATED_CLIENT_LIGHT) {
          scheme = Scheme.BRIGHT_LIGHT;
        } else if (data.scheme === Scheme.SPACE_GRAY || data.scheme === Scheme.DEPRECATED_CLIENT_DARK) {
          scheme = Scheme.SPACE_GRAY;
        }

        const schemeArray = {
          'bright_light': {
            status: Appearance.DARK,
            color: '#ffffff'
          },
          'space_gray': {
            status: Appearance.LIGHT,
            color: '#19191a'
          }
        };

        await bridge.send(
          'VKWebAppSetViewSettings',
          {
            'status_bar_style': schemeArray[scheme].status,
            'action_bar_color': schemeArray[scheme].color
          }
        );

        this.setState({
          scheme
        });
      }
    });
  }

  render() {
    const { scheme } = this.state;

    return (
      <ConfigProvider
        scheme={scheme}
        transitionMotionEnabled={false}
      >
        <AdaptivityProvider>
          <AppRoot>
            <Root activeView="main">
              <MainView id="main" />
            </Root>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    );
  }
}
