import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap'

const TabContent = () => {
    const [key, setKey] = useState('home');
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => k !== null && setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    Tab content for Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" >
                    Tab content for Contact
                </Tab>
            </Tabs>
        </div>
    )
}

export default TabContent