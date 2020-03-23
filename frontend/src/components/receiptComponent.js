import React from 'react';
import {Card, CardHeader, CardFooter, CardBody, CardText} from 'reactstrap';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col
} from 'reactstrap';
import classnames from 'classnames';

var receipts;
function setData(data) {
    receipts = data;
}

var buys;
function setBuys(data) {
    buys = data;
}

function Receipts({
    loadState,
    loadedAction,
    loadingAction,
    page,
    user,
    token,
    editItemAction
}) {

    const [activeTab, setActiveTab] = React.useState('1');

    const toggle = tab => {
        if (activeTab !== tab)
            setActiveTab(tab);
    }
        var path;

        if (user['role'] === 'Shopkeeper') {
            path = 'SHOP';
        } else {
            path = user['_id']
        }

        //fetch('http://localhost:3001/api/receipt/'+user['_id']).then(res=>res.json()).then(data => setData(data)).then(loadedAction);
        fetch('http://localhost:3001/api/receipt/' + path).then(res => res.json()).then(data => data.filter(receipt => receipt.seller === user['_id'])).then(data => setData(data)).then(() => fetch('http://localhost:3001/api/receipt/' + user['_id'])).then(res => res.json()).then(data => data.filter(receipt => receipt.buyer === user['_id'])).then(data => setBuys(data)).then(loadedAction)

        const receiptsToRender = [];
        const buys2 = [];
        if (loadState === 'LOADED') {

            receipts.map(itm => receiptsToRender.push(<div key={itm._id} style={{
                    display: "flex",
                    margin: "15px",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>
                <Card style={{
                        maxWidth: "500px",
                        minWidth: "30em",
                        marginBottom: "5px",
                        alignSelf: "center"
                    }}>
                    <CardHeader>Title: {itm.title}</CardHeader>

                    <CardBody>
                        <CardText>Amount: {itm.amount}
                            €</CardText>
                        <CardText>Date: {itm.date}</CardText>

                    </CardBody>
                    <CardFooter>
                        {
                            itm.seller === user['_id']
                                ? 'SOLD TO STORE'
                                : 'BOUGHT FROM STORE'
                        }
                    </CardFooter>
                </Card>
            </div>));

            buys.map(itm => buys2.push(<div key={itm._id} style={{
                    display: "flex",
                    margin: "15px",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>
                <Card style={{
                        maxWidth: "500px",
                        minWidth: "30em",
                        marginBottom: "5px",
                        alignSelf: "center"
                    }}>
                    <CardHeader>Title: {itm.title}</CardHeader>

                    <CardBody>
                        <CardText>Amount: {itm.amount}
                            €</CardText>
                        <CardText>Date: {itm.date}</CardText>

                    </CardBody>
                    <CardFooter>
                        {
                            itm.seller === user['_id']
                                ? 'SOLD TO STORE'
                                : 'BOUGHT FROM STORE'
                        }
                    </CardFooter>
                </Card>
            </div>));

        } else {
            receiptsToRender.push(<div key="none">
                <div>Loading...</div>
            </div>)
        }

        //return  (<div><div> <h2 className="display-4"  >Receipts</h2><hr className="my-2" /></div><div>{receiptsToRender}</div></div>)

        return (<div>
            <Nav tabs="tabs">
                <NavItem>
                    <NavLink className={classnames({
                            active: activeTab === '1'
                        })} onClick={() => {
                            toggle('1');
                        }}>
                        <h4>Sales</h4>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({
                            active: activeTab === '2'
                        })} onClick={() => {
                            toggle('2');
                        }}>
                        <h4>Buys</h4>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <div>
                                <div>{receiptsToRender}</div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <div>{buys2}</div>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>);

    }
  
    export default Receipts;
