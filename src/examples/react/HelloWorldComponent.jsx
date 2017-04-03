const React = require('react');
const SearchForm = require("./SearchData.jsx");
const MapResults = require("./MapsResults.jsx");

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {}
    }
    this.search = this.search.bind(this);
  }
  search(data) {
    this.setState({searchData: data}, () =>{
      this.refs.map.search();
    });
  }
  render() {
    return (
      <div>
        <div className='alert alert-success'>
          <p>Bussiness Seach</p>
        </div>
        <SearchForm onSearch={this.search}></SearchForm>
        <MapResults search={this.state.searchData} ref="map"></MapResults>
      </div>
    )
  }
}

module.exports = Container; 