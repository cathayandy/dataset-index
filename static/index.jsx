import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import { Layout, Input, Button, Row, Col } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
require('./index.css');

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            validate: 'initial',
            value: '',
            button: 'disable',
        };
    }
    onInputChange(e) {
        const { value } = e.target;
        const reg = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
        if (!reg.test(value)) {
            this.setState({
                validate: 'failure',
                button: 'disable',
            });
        } else {
            this.setState({
                validate: 'success',
                button: 'normal',
            });
        }
        this.setState({ value });
    }
    onSend(e) {
        this.setState({ button: 'loading' });
        fetch('/mail/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                addr: this.state.value,
            }),
        })
            .then((res) => res.status === 204 ?
                this.setState({ button: 'success' }):
                this.setState({ button: 'failure' }));
    }
    renderInput() {
        const map = {
            initial: <Input
                type="text"
                onChange={(e) => this.onInputChange(e)}
                placeholder="Input your email address to get the dataset download link."
            />,
            success: <Input
                type="text"
                onChange={(e) => this.onInputChange(e)}
                onPressEnter={this.onSend}
                placeholder="Input your email address to get the dataset download link."
            />,
            failure: <Input
                type="text"
                onChange={(e) => this.onInputChange(e)}
                placeholder="Input your email address to get the dataset download link."
            />,
        };
        return map[this.state.button];
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
            success: <Button icon='check' onClick={(e) => this.onSend(e)}>
                Send
            </Button>,
            failure: <Button icon='close' onClick={(e) => this.onSend(e)}>
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
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ height: '100%', marginLeft: 24 }}>
                        <h1>XXX Dataset</h1>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <h1 style={marginBottom}>
                            Description
                        </h1>
                        <div style={marginBottom}>
                            This Agreement was last modified on February 10, 2014.<br/>
                            Please read these Terms and Conditions ("Agreement", "Terms of Service") carefully before using leetcode.com ("the Site") operated by LeetCode ("us", "we", or "our"). This Agreement sets forth the legally binding terms and conditions for your use of the Site at leetcode.com.<br/>
                            By accessing or using the Site in any manner, including, but not limited to, visiting or browsing the Site or contributing content or other materials to the Site, you agree to be bound by these Terms and Conditions. Capitalized terms are defined in this Agreement.<br/>
                        </div>
                        <h1 style={marginBottom}>
                            Note
                        </h1>
                        <div style={marginBottom}>
                            This Agreement was last modified on February 10, 2014.<br/>
                            Please read these Terms and Conditions ("Agreement", "Terms of Service") carefully before using leetcode.com ("the Site") operated by LeetCode ("us", "we", or "our"). This Agreement sets forth the legally binding terms and conditions for your use of the Site at leetcode.com.<br/>
                            By accessing or using the Site in any manner, including, but not limited to, visiting or browsing the Site or contributing content or other materials to the Site, you agree to be bound by these Terms and Conditions. Capitalized terms are defined in this Agreement.<br/>
                        </div>
                        <h1 style={marginBottom}>
                            Download
                        </h1>
                        <Row gutter={16}>
                            <Col lg={9} sm={9} xs={24} style={marginBottom}>
                                <Input
                                    onChange={(e) => this.onInputChange(e)}
                                    placeholder="Input your email address to get the dataset download link."
                                />
                            </Col>
                            <Col lg={3} sm={3} xs={24} style={marginBottom}>
                                { this.renderButton() }
                            </Col>
                        </Row>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Copyright ©2016 by XXX. All rights reserved.
                </Footer>
            </Layout>
        );
    }
};

render(<App />, document.querySelector('#app'));