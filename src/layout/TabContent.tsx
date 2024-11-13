import { Tab, Tabs } from 'react-bootstrap'

const TabContent = () => {
    return (
        <div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Home">
                    Tab content for Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    Tab content for Contact
                </Tab>
            </Tabs>
        </div>
    )
}

export default TabContent