import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';
import { Input, Button, Row, Col, Checkbox, Icon } from 'antd';
const { ip, port } = config;

export default class Download extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            emailValidate: 'initial',
            email: '',
            nameValidate: 'initial',
            name: '',
            institudeValidate: 'initial',
            institude: '',
            checked: false,
            button: 'disable',
        };
    }
    onCheck(e) {
        const { checked } = e.target;
        if (!checked) {
            this.setState({
                button: 'disable',
            });
        } else if (this.state.nameValidate === 'success' &&
            this.state.institudeValidate === 'success' &&
            this.state.emailValidate === 'success') {
            this.setState({
                button: 'normal',
            });
        }
        this.setState({ checked });
    }
    onEmailInputChange(e) {
        const { value } = e.target;
        const reg = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
        if (value === '') {
            this.setState({
                emailValidate: 'initial',
                button: 'disable',
            });
        } else if (!reg.test(value)) {
            this.setState({
                emailValidate: 'failure',
                button: 'disable',
            });
        } else {
            this.setState({
                emailValidate: 'success',
            });
            if (this.state.nameValidate === 'success' &&
                this.state.institudeValidate === 'success' &&
                this.state.checked) {
                this.setState({
                    button: 'normal',
                });
            }
        }
        this.setState({ email: value });
    }
    onNameInputChange(e) {
        const { value } = e.target;
        if (value === '') {
            this.setState({
                nameValidate: 'initial',
                button: 'disable',
            });
        } else {
            this.setState({
                nameValidate: 'success',
            });
            if (this.state.emailValidate === 'success' &&
                this.state.institudeValidate === 'success' &&
                this.state.checked) {
                this.setState({
                    button: 'normal',
                });
            }
        }
        this.setState({ name: value });
    }
    onInstitudeInputChange(e) {
        const { value } = e.target;
        if (value === '') {
            this.setState({
                institudeValidate: 'initial',
                button: 'disable',
            });
        } else {
            this.setState({
                institudeValidate: 'success',
            });
            if (this.state.emailValidate === 'success' &&
                this.state.nameValidate === 'success' &&
                this.state.checked) {
                this.setState({
                    button: 'normal',
                });
            }
        }
        this.setState({ institude: value });
    }
    onSend(e) {
        if (!this.state.checked || this.state.emailValidate !== 'success' ||
            this.state.nameValidate !== 'success' ||
            this.state.institudeValidate !== 'success') {
            return;
        }
        this.setState({ button: 'loading' });
        fetch(`http://${ip}:${port}/mail/request`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                institude: this.state.institude,
            }),
        })
            .then((res) => res.status === 204 ?
                this.setState({ button: 'success' }):
                this.setState({ button: 'failure' }));
    }
    renderEmailInput() {
        const map = {
            initial: <Input
                prefix={<Icon type='mail' style={{ fontSize: 13 }} />}
                type='text'
                onChange={(e) => this.onEmailInputChange(e)}
                placeholder='E-mail'
            />,
            success: <Input
                type='text'
                prefix={<Icon type='mail' style={{ fontSize: 13 }} />}                
                onChange={(e) => this.onEmailInputChange(e)}
                className='input-success'
                placeholder='E-mail'
            />,
            failure: <Input
                type='text'
                prefix={<Icon type='mail' style={{ fontSize: 13 }} />}                
                onChange={(e) => this.onEmailInputChange(e)}
                className='input-error'
                placeholder='E-mail'
            />,
        };
        return map[this.state.emailValidate];
    }
    renderNameInput() {
        const map = {
            initial: <Input
                prefix={<Icon type='user' style={{ fontSize: 13 }} />}
                type='text'
                onChange={(e) => this.onNameInputChange(e)}
                placeholder='Name'
            />,
            success: <Input
                type='text'
                prefix={<Icon type='user' style={{ fontSize: 13 }} />}                
                onChange={(e) => this.onNameInputChange(e)}
                className='input-success'
                placeholder='Name'
            />,
        };
        return map[this.state.nameValidate];
    }
    renderInstitudeInput() {
        const map = {
            initial: <Input
                prefix={<Icon type='home' style={{ fontSize: 13 }} />}
                type='text'
                onChange={(e) => this.onInstitudeInputChange(e)}
                placeholder='Institude'
            />,
            success: <Input
                type='text'
                prefix={<Icon type='home' style={{ fontSize: 13 }} />}                
                onChange={(e) => this.onInstitudeInputChange(e)}
                className='input-success'
                placeholder='Institude'
            />,
        };
        return map[this.state.institudeValidate];
    }
    renderButton() {
        const map = {
            disable: <Button icon='mail' disabled>
                Send
            </Button>,
            normal: <Button icon='mail' onClick={(e) => this.onSend(e)}>
                Send
            </Button>,
            loading: <Button icon='loading' loading>
                Send
            </Button>,
            success: <Button icon='check' onClick={(e) => this.onSend(e)} className='btn-success'>
                Send
            </Button>,
            failure: <Button icon='close' onClick={(e) => this.onSend(e)} className='btn-error'>
                Send
            </Button>,
        };
        return map[this.state.button];
    }
    render() {
        const marginBottom = {
            marginBottom: '16px',
        };
        return (
            <Row gutter={16}>
                <Col lg={8} md={8} sm={24} xs={24} style={marginBottom}>
                    { this.renderNameInput() }
                </Col>
                <Col lg={8} md={8} sm={24} xs={24} style={marginBottom}>
                    { this.renderInstitudeInput() }
                </Col>
                <Col lg={8} md={8} sm={24} xs={24} style={marginBottom}>
                    { this.renderEmailInput() }
                </Col>
                <Col lg={24} md={24} sm={24} xs={24} style={marginBottom}>
                    <Checkbox onChange={(e) => this.onCheck(e)}>I agree with the above note.</Checkbox>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                    { this.renderButton() }
                </Col>
            </Row>
        );
    }
};
