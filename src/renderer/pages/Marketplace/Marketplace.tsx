import { Row, Col, Input } from 'antd';
import styled from 'styled-components';
import imgBanner from './marketplace1.jpg';
const { Search } = Input;

const MarketPlaceContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  main.ant-layout-content.site-layout-background {
    padding: 0 !important;
  }
  .banner {
    background-image: url(${imgBanner});
    background-size: cover;
    background-attachment: scroll;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    span.ant-input-group-wrapper.ant-input-search {
      width: 300px;
      background: transparent;
    }
  }
  .ant-row {
    &.main {
      height: 100%;
    }
    .ant-col {
      border-radius: 3px;
      background: ${(props: { theme: { cardBg: any } }) => props.theme.cardBg};
      &.main {
        height: 100%;
      }
      padding: 12px;
      .btn-action-pmd {
        font-size: 1rem;
        color: var(--purple-1);
      }
      h4,
      h3,
      p {
        color: ${(props: { theme: { cardTexColor: any } }) =>
          props.theme.cardTexColor} !important;
      }
      p {
        font-size: 0.8rem;
      }
      .ant-avatar-group {
      }
      &.doc-ls {
        padding: 0;
        .ant-card {
          border: 1px solid var(--purple-1);
        }
        .doc-item {
          background-color: blue;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .square {
            width: 70px;
            height: 70px !important;
            background: green;
            svg {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;

export default function Marketplace(props: any) {
  const onSearch = (value) => console.log(value);

  return (
    <>
      <MarketPlaceContainer theme={props.theme}>
        <div className="banner">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
      </MarketPlaceContainer>
    </>
  );
}
