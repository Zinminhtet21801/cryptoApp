import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import { useGetCryptoExchangesQuery } from "../../services/cryptoApi";
import Loader from "../Loader/Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  console.log(exchangesList);
  if (!exchangesList) return <Loader />
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((value, index) => (
          <Col span={24} key={index}>
            <Collapse defaultActiveKey={["1"]}>
              <Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                    <Text>{value.rank}</Text>
                      {<Avatar src={value.iconUrl} className="exchange-image" />}
                    </Col>
                    <Col span={6}>${millify(value.volume)}</Col>
                    <Col span={6}>{millify(value.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(value.marketShare)}%</Col>
                  </Row>
                }
              >
                  {HTMLReactParser(value.description || "Nothing to Show")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
