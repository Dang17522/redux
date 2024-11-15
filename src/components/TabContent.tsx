import { Container, Tab, Tabs } from 'react-bootstrap';
import { changSelected } from '../redux/app/AppSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import BlogTable from './blog/BlogTable';
import UserTable from './user/UserTable';

const TabContent = () => {
    const key = useAppSelector(state => state.app.tabSelected);

    const handleSelect = (k: any) => {
        if (k) {
            dispatch(changSelected(k));
        }
    }
    const dispatch = useAppDispatch();
    return (
        <Container>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => handleSelect(k)}
                className="mb-3"
            >
                <Tab eventKey="user" title="Users">
                    <UserTable/>
                </Tab>
                <Tab eventKey="blog" title="Blogs">
                    <BlogTable/>
                </Tab>
                
            </Tabs>
        </Container>
    )
}

export default TabContent