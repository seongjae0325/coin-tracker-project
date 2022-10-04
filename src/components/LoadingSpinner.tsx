import styled from "styled-components";

const Container = styled.div`
  max-width: 80px;
  margin: 30px auto;
`;

const Spinner = styled.div`
  display: block;
  width: 50px;
  height: 50px;
  border: 7px solid ${(props) => props.theme.textColor};
  border-radius: 50%;
  border-top-color: ${(props) => props.theme.bgColor};
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

function LoadingSpinner() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default LoadingSpinner;
