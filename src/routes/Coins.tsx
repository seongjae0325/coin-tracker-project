import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 35px;
  font-weight: 700;
  animation: rotate_image 6s linear infinite;
  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
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

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    display: flex;
    align-items: center;
    transition: color 0.3s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const BottomPadding = styled.div`
  height: 20px;
  z-index: 1;
  bottom: 0;
  position: sticky;
  background-color: ${(props) => props.theme.bgColor};
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setIsLoading] = useState(true);

  const getCoinsListData = async () => {
    const response = await axios.get("https://api.coinpaprika.com/v1/coins");
    setCoins(response.data.slice(0, 200));
    setIsLoading(false);
  };

  useEffect(() => {
    getCoinsListData();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>코인 리스트</Title>
        </Header>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <CoinList>
            {coins.map((coin) => (
              <Coin key={coin.id}>
                <Link to={coin.id}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  {coin.name}
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Container>
      <BottomPadding />
    </>
  );
}
export default Coins;
