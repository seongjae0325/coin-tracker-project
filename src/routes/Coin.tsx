import { useParams, Outlet } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 35px;
  font-weight: 700;
`;

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
`;

const Detail = styled.div`
  text-align: center;
  padding: 15px;
  div:first-child {
    margin-bottom: 10px;
    font-size: 13px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Text = styled.div`
  font-weight: 700;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 15px;
`;

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface ITeam {
  id: string;
  name: string;
  position: string;
}

interface IWhitepaper {
  link: string;
  thumbnail: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  team: ITeam[];
  whitepaper: IWhitepaper;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

function Coin() {
  const { coinId } = useParams();
  const [coinInfoData, setCoinInfoData] = useState<IInfoData>();
  const [loading, setIsLoading] = useState(true);

  const getCoinsListData = async () => {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/coins/${coinId}`
    );
    setCoinInfoData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCoinsListData();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{coinId}</Title>
        <Img src={coinInfoData?.logo} />
      </Header>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <DetailBox>
            <Detail>
              <Text>랭크:</Text>
              <Text>{coinInfoData?.rank}</Text>
            </Detail>
            <Detail>
              <Text>이름:</Text>
              <Text>{coinInfoData?.name}</Text>
            </Detail>
            <Detail>
              <Text>심볼:</Text>
              <Text>{coinInfoData?.symbol}</Text>
            </Detail>
          </DetailBox>
          <DetailBox>
            <Detail>
              <Text>발행일:</Text>
              <Text>
                {coinInfoData?.started_at?.split("T")[0] || "정보 없음"}
              </Text>
            </Detail>
            <Detail>
              <Text>데이터 시작일:</Text>
              <Text>
                {coinInfoData?.first_data_at?.split("T")[0] || "정보 없음"}
              </Text>
            </Detail>
            <Detail>
              <Text>데이터 최종일:</Text>
              <Text>
                {coinInfoData?.last_data_at?.split("T")[0] || "정보 없음"}
              </Text>
            </Detail>
          </DetailBox>
          <DetailBox>
            <Detail>
              <Text>코인 설명</Text>
              <Text>{coinInfoData?.description}</Text>
            </Detail>
          </DetailBox>
          <DetailBox>
            <Detail>
              <Text>해쉬 알고리즘</Text>
              <Text>{coinInfoData?.hash_algorithm}</Text>
            </Detail>
            <Detail>
              <Text>타입:</Text>
              <Text>{coinInfoData?.type}</Text>
            </Detail>
            <Detail>
              <Text>오픈소스 공개:</Text>
              <Text>{coinInfoData?.open_source ? "Yes" : "No"}</Text>
            </Detail>
          </DetailBox>
          <Outlet />
        </>
      )}
    </Container>
  );
}
export default Coin;
