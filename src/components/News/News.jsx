import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../../services/newsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loader from "../Loader/Loader";
const { Text, Title } = Typography;
const { Option } = Select;
const demoImageUrl =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const { data: cryptoDataList } = useGetCryptosQuery(100);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: news, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });
  console.log(news);
  if (!news?.value) return <Loader />
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={21}>
          <Select
            showSearch
            placeholder="Select a news category"
            className="select-news"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase())
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptoDataList?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}

      {news.value.map((cryptoNews, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={cryptoNews.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title level={4} className="news-title">
                  {cryptoNews.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={cryptoNews?.image?.thumbnail?.contentUrl || demoImageUrl}
                  alt=""
                />
              </div>
              <p>
                {cryptoNews.description > 100
                  ? `${cryptoNews.description.substring(0, 100)} ...`
                  : cryptoNews.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      cryptoNews.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImageUrl
                    }
                    alt=""
                  />
                  <Text className="provider-name">
                    {cryptoNews.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(cryptoNews.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
