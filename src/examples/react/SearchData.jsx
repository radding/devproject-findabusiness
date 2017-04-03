const React = require('react');

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            business_name: "",
            zipcode: "",
            phone_number: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.go = this.go.bind(this)
    }
    go() {
        this.props.onSearch(this.state);

    }
    handleInput(event) {
        const target = event.target;
        this.setState( {
            [target.name]: target.value
        });
    }
    render() {
        return (
            <div className="wrapper">
                <div>
                    <label>Enter Zipcode</label>
                    <input name="zipcode" type="text" value={this.state.zipcode} onChange={this.handleInput}/>
                </div>
                 <div>
                    <label>Business name</label>
                    <input name="business_name" type="text" value={this.state.business_name} onChange={this.handleInput}/>
                </div>
                <div>
                    <label>Business Phone number</label>
                    <input name="phone_number" type="text" value={this.state.phone_number} onChange={this.handleInput} />
                </div>
                <div>
                    <button onClick={this.go}>Search</button>
                </div>
            </div>
        );
    }
}

module.exports = SearchForm; 