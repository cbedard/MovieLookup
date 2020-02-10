import React, { Component } from 'react';
import { TableRow } from './TableRow.js';

export class Table extends Component {
  static displayName = Table.name;

  constructor(props) {
    super(props);
      this.state = {forecasts: [], loading: true, currentSelection: {} };
  }

  componentDidMount() {
      this.populateWeatherData('./weatherforecast/');
    }

    sendData() {
        //this.setState({ currentSelection: data });
        this.props.selectedMedia(this.state.currentSelection);
    }

    updateData(data) {
        this.setState({ currentSelection: data }, this.sendData);
    }

  renderForecastsTable(forecasts) {

      return (
        <tbody>
            {forecasts.map(forecast =>
                <tr key={forecast.imdbid} onClick={this.updateData.bind(this, forecast)}>
                <td>
                    <TableRow title={forecast.title} poster={forecast.poster} plot={forecast.plot} year={forecast.year} director={forecast.director} actors={forecast.actors} imdbrating={forecast.imdbRating} metascore={forecast.metascore} />
                </td>
            </tr>
          )}
        </tbody>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        {contents}
      </div>
    );
  }

    async populateWeatherData(query) {
        const response = await fetch(query);
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
