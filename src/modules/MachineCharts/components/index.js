import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ButtonWrapper from 'components/Styles/ButtonWrapper';
import Button from 'components/Button';
import Loading from 'components/Loading';

const format = () => tick => tick;
const Root = props => <Legend.Root {...props} className="m-auto flex-row" />;
const Item = props => <Legend.Item {...props} className="flex-column" />;
const Label = props => <Legend.Label {...props} className="pt-2" />;

const ValueLabel = props => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}°C`} />;
};
const EmptyComponent = () => null;

class MachineCharts extends PureComponent {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    chartData: PropTypes.array,
    machineNames: PropTypes.array,
    minTemperature: PropTypes.number,
    maxTemperature: PropTypes.number,
  };

  static defaultProps = {
    chartData: null,
    machineNames: null,
    errorMessage: '',
    minTemperature: null,
    maxTemperature: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment().startOf('month'),
      endDate: moment().endOf('day'),
    };
  }

  renderDatePickers = () => {
    const { startDate, endDate } = this.state;
    const { fetchData } = this.props;
    return (
      <div>
        <div>
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={date => this.setState({ startDate: date })}
            placeholderText="Start Date"
          />
        </div>

        <div>
          End Date:
          <DatePicker
            selected={endDate}
            onChange={date => this.setState({ endDate: date })}
            placeholderText="End Date"
          />
        </div>

        <ButtonWrapper>
          <Button
            primary
            value="Draw Chart"
            onClick={() => fetchData(startDate.format(), endDate.format())}
          />
        </ButtonWrapper>
      </div>
    );
  };

  getLineSeries = () => {
    const { machineNames } = this.props;

    return machineNames.map(name => (
      <LineSeries key={name} name={name} valueField={name} argumentField="date" />
    ));
  };

  render() {
    const { isLoading, errorMessage, chartData, minTemperature, maxTemperature } = this.props;

    if (errorMessage) {
      return (
        <div>
          {this.renderDatePickers()}
          Error:
          {errorMessage}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div>
          {this.renderDatePickers()}
          <Loading />
        </div>
      );
    }

    if (chartData.length) {
      return (
        <Card>
          {this.renderDatePickers()}

          <Chart data={chartData} className="pr-3" width={1000}>
            <ArgumentAxis tickFormat={format} />
            <ValueAxis
              min={minTemperature - 20}
              max={maxTemperature + 20}
              labelComponent={ValueLabel}
              lineComponent={EmptyComponent}
              tickComponent={EmptyComponent}
            />
            <ValueGrid />

            {this.getLineSeries()}
            <Legend
              position="bottom"
              rootComponent={Root}
              itemComponent={Item}
              labelComponent={Label}
            />
            <Title text={`Machine Temperatures ${'\n'}`} className="w-100 text-center mb-2" />
            <Animation />
            <Scale />
          </Chart>
        </Card>
      );
    }

    return this.renderDatePickers();
  }
}

export default MachineCharts;
