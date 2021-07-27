import React from 'react';
import axios from 'axios';
import {
  Panel,
  View,
  PanelHeader,
  Div, PanelHeaderBack
} from "@vkontakte/vkui";

import {FinishStep, GroupStep, MainStep, Support} from "src/components/steps";

import getHash from "src/functions/getHash";

import Logo from "src/img/logo.png";

import style from './Main.scss';

interface IProps {
  id: string
}

interface IState {
  step: number
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      step: 0
    };

    this.nextStep = this.nextStep.bind(this);
    this.backStep = this.backStep.bind(this);
    this.finishStep = this.finishStep.bind(this);
  }

  nextStep() {
    const { step } = this.state;

    this.setState({
      step: step + 1
    });
  }

  backStep() {
    const { step } = this.state;

    this.setState({
      step: step - 1
    });
  }

  async finishStep(id: number, type: 'group' | 'user') {
    this.nextStep();

    const url = 'https://localhost/test/api';

    /*
    * id - id пользователя или группы ВКонтакте
    * type - тип id, группа или пользователя
    * token - внутренний токен пользователя в приложении ШоуБокс
    * userId - внутренний id пользователя в приложении ШоуБокс
    */
    const { data } = await axios.post(url, {
      id,
      type,
      token: getHash('token'),
      userId: getHash('userId')
    });
  }

  render() {
    const { step } = this.state;

    return (
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader left={step === 1 && <PanelHeaderBack onClick={this.backStep} />}>
            <img className={style.logo} src={Logo} alt="" />
          </PanelHeader>
          <Div className={style.step}>
            {step === 0 && <MainStep changeStep={this.nextStep} />}
            {step === 1 && <GroupStep changeStep={this.finishStep} />}
            {step === 2 && <FinishStep />}
            <Support />
          </Div>
        </Panel>
      </View>
    );
  }
}
