import { Empty, Button } from 'antd';
import styled from 'styled-components';
const TemplateBuilderContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 50px;
  main.ant-layout-content.site-layout-background {
    padding: 0 !important;
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

export default function TemplateBuilder(props: any) {
  return (
    <>
      <TemplateBuilderContainer>
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
            marginTop: '25%',
            marginRight: 'auto'
          }}
          description={
            <span>
              Customize <a href="#API">Description</a>
            </span>
          }
        >
          <Button type="primary">Create Now</Button>
        </Empty>
      </TemplateBuilderContainer>
    </>
  );
}
