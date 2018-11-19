import React, { PureComponent } from 'react';
import { Card } from 'reactstrap';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  ValueGrid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Scale, Animation } from '@devexpress/dx-react-chart';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

const format = () => tick => tick;
const Root = props => <Legend.Root {...props} className="m-auto flex-row" />;
const Item = props => <Legend.Item {...props} className="flex-column" />;
const Label = props => <Legend.Label {...props} className="pt-2" />;

const ValueLabel = props => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}%`} />;
};
const EmptyComponent = () => null;

class MachineCharts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [
        {
          year: 1993,
          tvNews: 19,
          church: 29,
          military: 32,
        },
        {
          year: 1995,
          tvNews: 13,
          church: 32,
          military: 33,
        },
        {
          year: 1997,
          tvNews: 14,
          church: 35,
          military: 30,
        },
        {
          year: 1999,
          tvNews: 13,
          church: 32,
          military: 34,
        },
        {
          year: 2001,
          tvNews: 15,
          church: 28,
          military: 32,
        },
        {
          year: 2003,
          tvNews: 16,
          church: 27,
          military: 48,
        },
        {
          year: 2006,
          tvNews: 12,
          church: 28,
          military: 41,
        },
        {
          year: 2008,
          tvNews: 11,
          church: 26,
          military: 45,
        },
        {
          year: 2010,
          tvNews: 10,
          church: 25,
          military: 44,
        },
        {
          year: 2012,
          tvNews: 11,
          church: 25,
          military: 43,
        },
        {
          year: 2014,
          tvNews: 10,
          church: 25,
          military: 39,
        },
        {
          year: 2016,
          tvNews: 8,
          church: 20,
          military: 41,
        },
        {
          year: 2018,
          tvNews: 10,
          church: 20,
          military: 43,
        },
      ],
    };
  }

  render() {
    const { chartData } = this.state;

    return (
      <Card>
        <Chart data={chartData} className="pr-3" width={1000}>
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            max={50}
            labelComponent={ValueLabel}
            lineComponent={EmptyComponent}
            tickComponent={EmptyComponent}
          />
          <ValueGrid />

          <LineSeries name="TV news" valueField="tvNews" argumentField="year" />
          <LineSeries name="Church" valueField="church" argumentField="year" />
          <LineSeries name="Military" valueField="military" argumentField="year" />
          <Legend
            position="bottom"
            rootComponent={Root}
            itemComponent={Item}
            labelComponent={Label}
          />
          <Title
            text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
            className="w-100 text-center mb-2"
          />
          <Animation />
          <Scale />
        </Chart>
      </Card>
    );
  }
}

export default MachineCharts;
