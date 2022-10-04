import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
    transition: color 0.3s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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
  const geCoinData = async () => {
    const response = await axios.get("https://api.coinpaprika.com/v1/coins");
    setCoins(response.data);
  };

  useEffect(() => {
    geCoinData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인 리스트</Title>
      </Header>
      <CoinList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={coin.id}>{coin.name}</Link>
          </Coin>
        ))}
      </CoinList>
    </Container>
  );
}
export default Coins;
