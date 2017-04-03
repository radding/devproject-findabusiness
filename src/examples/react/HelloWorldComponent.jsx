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
      <div className="container-fluid">
        <div className='alert alert-success'>
          <p>Bussiness Seach</p>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-push-2 col-md-pull-2">
            <SearchForm onSearch={this.search}></SearchForm>
          </div>
        </div>
        <div className="row">
          <MapResults search={this.state.searchData} ref="map"></MapResults>
        </div>
      </div>
    )
  }
}

module.exports = Container; 