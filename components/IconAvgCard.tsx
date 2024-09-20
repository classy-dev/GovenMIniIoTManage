import styled from '@emotion/styled';
import Card from './Card';

const IconAvgCardWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0;

  .left {
    display: inline-flex;
    gap: 1rem;
    align-items: center;
  }

  .icon {
    display: inline-flex;
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: rgba(197, 197, 197, 0.1);
    color: #171c8f;
  }

  .title {
    font-weight: normal;
    font-size: 1.4rem;
    color: #8e8e8e;
    margin-bottom: 0 !important;
  }

  .value {
    font-size: 2.4rem;
    font-weight: bold;
  }

  .unit {
    font-weight: bold;
    margin-left: 0.4rem;
    font-size: 1.6rem;
  }
`;

interface IconAvgCardProps {
  className?: string;
  icon: React.ReactNode;
  title: string;
  value: number;
}

const IconAvgCard = ({ className, icon, title, value }: IconAvgCardProps) => (
  <Card className={className ?? ''}>
    <IconAvgCardWrapper>
      <div className="left">
        <div className="icon">{icon}</div>
        <span className="title">{title}</span>
      </div>
      <div className="right">
        <span className="value">{value.toFixed(1)}</span>
        <span className="unit">%</span>
      </div>
    </IconAvgCardWrapper>
  </Card>
);

export default IconAvgCard;
