import { InfoCircleOutlined } from '@ant-design/icons';
import { Row, Col, Tooltip } from 'antd';
import Yuan from '../utils/Yuan';
import { ChartCard } from './Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6,
  style: { marginBottom: 24 },
};

export default function IntroduceRow() {
  return (
    <>
      <Row gutter={24}>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Compras"
            action={
              <Tooltip title="指标说明">
                <InfoCircleOutlined />
              </Tooltip>
            }
            // loading={loading}
            total={() => <Yuan>0</Yuan>}
            // footer={<Field label="日销售额" value={`￥${numeral(12423).format('0,0')}`} />}
            contentHeight={46}
          >
            {/* <Trend flag="up" style={{ marginRight: 16 }}>
              周同比
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend> */}
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Equipes"
            action={
              <Tooltip title="指标说明">
                <InfoCircleOutlined />
              </Tooltip>
            }
            // loading={loading}
            total={() => <p>126560</p>}
            // footer={<Field label="日销售额" value={`￥${numeral(12423).format('0,0')}`} />}
            contentHeight={46}
          >
            {/* <Trend flag="up" style={{ marginRight: 16 }}>
              周同比
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend> */}
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="总销售额"
            action={
              <Tooltip title="指标说明">
                <InfoCircleOutlined />
              </Tooltip>
            }
            // loading={loading}
            total={() => <p>126560</p>}
            // footer={<Field label="日销售额" value={`￥${numeral(12423).format('0,0')}`} />}
            contentHeight={46}
          >
            {/* <Trend flag="up" style={{ marginRight: 16 }}>
              周同比
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend> */}
          </ChartCard>
        </Col>
      </Row>
    </>
  );
}
