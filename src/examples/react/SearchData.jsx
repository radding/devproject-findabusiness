const React = require('react');

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            business_name: "",
            zipcode: "",
            phone_number: "", 
            err_code: 0
        };
        this.handleInput = this.handleInput.bind(this);
        this.go = this.go.bind(this)
    }
    go() {
        var err_code = 0;
        if(this.state.zipcode == "") {
            err_code = err_code | 1<<0;
        }
        if (this.state.business_name == "" && this.state.phone_number == "") {
            err_code = err_code | 1<<1;
        }
        
        if (err_code > 0) {
            this.setState({err_code: err_code});
            return;
        }
        this.setState({err_code: err_code});
        this.props.onSearch(this.state);

    }
    handleInput(event) {
        const target = event.target;
        this.setState( {
            [target.name]: target.value
        });
    }
    render() {
        var err = "";

        if (this.state.err_code > 0) {
            var msg = [];
            if (this.state.err_code & 1) {
                msg.push(<p className="alert alert-danger" key="2">A Zipcode is Required!</p>);
            }
            if (this.state.err_code & 2) {
                msg.push(<p className="alert alert-danger" key="1">The Business's name or phone number is required!</p>);
            }
            err = (
                <div>
                    {msg}
                </div>
            );
        }
        return (
            <div className="form-group">
                {err}
                <div>
                    <label>Enter Zipcode</label>
                    <input name="zipcode" type="text" className="form-control" value={this.state.zipcode} onChange={this.handleInput}/>
                </div>
                 <div>
                    <label>Business name</label>
                    <input name="business_name" type="text" className="form-control" value={this.state.business_name} onChange={this.handleInput}/>
                </div>
                <div>
                    <label>Business Phone number</label>
                    <input name="phone_number" type="text"  className="form-control" value={this.state.phone_number} onChange={this.handleInput} />
                </div>
                <div className="col-md-4 text-center"> 
                     <button type="submit" onClick={this.go} className="btn btn-primary">Search</button>
                </div>
            </div>
        );
    }
}

module.exports = SearchForm; 