import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import DocumentMeta from 'react-document-meta';
import Statics from './index.md';
import styles from './index.less';
const { title } = config;

class App extends PureComponent {
    render() {
        return (
            <Layout>
                <DocumentMeta title={title}/>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ height: '100%', marginLeft: 24 }}>
                        <h1>{title}</h1>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{ padding: 24, background: '#fff', minHeight: 360 }}
                        className='main-container'
                    >
                        <Statics/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Copyright ©2016 by { title }. All rights reserved.
                </Footer>
            </Layout>
        );
    }
};

render(<App />, document.querySelector('#app'));