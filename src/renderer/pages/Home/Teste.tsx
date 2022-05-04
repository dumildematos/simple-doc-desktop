import styled from 'styled-components';

const Box = styled.div`
  color: ${(props) => props.theme.titleColor};
`;

// eslint-disable-next-line react/prop-types
export default function Teste({ theme }) {
  console.log(theme);
  return (
    <>
      <Box>
        <p>Teste</p>
        <div>Dumilde Matos</div>
      </Box>
    </>
  );
}
