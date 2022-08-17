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

export default function IntroduceRow({ activity , t }) {
  return (
    <>
      <Row gutter={24}>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={t('comum.purchases')}
            action={
              <Tooltip title={t('comum.total_template_prices')}>
                <InfoCircleOutlined />
              </Tooltip>
            }
            // loading={loading}
            total={() => <Yuan>{activity.totalTemplatePrice}</Yuan>}
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
            title={t('comum.teams')}
            action={
              <Tooltip title={t('comum.total_created_teams')}>
                <InfoCircleOutlined />
              </Tooltip>
            }
            // loading={loading}
            total={() => <p>{activity.totalOfTeams}</p>}
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
            title={t('comum.documents')}
            action={
              <Tooltip title={t('comum.total_created_documents')}>
                <InfoCircleOutlined />
              </Tooltip>
            }
            // loading={loading}
            total={() => <p>{activity.totalOfDocuments}</p>}
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
