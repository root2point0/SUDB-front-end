import React, { Component } from 'react'
import BookOptions from './BookOptions'

export default class BlindDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseURL: 'https://api.nytimes.com/svc/books/v3',
            listBase: '/lists/current/', 
            listOptions: [],
            listType: '',
            key: '.json?api-key=',
            apiKey: 'AvrhDA0S3I6hhszKEo8ljVKVDAPUGLAy',
            searchURL: '',
            hideBar: false,
        }
    }

    componentDidMount() {
        this.props.resetRedirect();
        fetch(this.state.baseURL + '/lists/names' + this.state.key + this.state.apiKey)
            .then(response => {
                return response.json();
            })
            .then(results => {
                let optionsFromApi = results.results.map(result => {
                    return {value: result.list_name_encoded, display: result.display_name}
                });
                this.setState({
                    listOptions: [{value: '', display: 'Select Bestseller List'}].concat(optionsFromApi)
                });
            }).catch(err => console.log(err));
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            searchURL: this.state.baseURL + this.state.listBase + this.state.listType + this.state.key + this.state.apiKey, 
            hideBar: true
        }, () => {
            fetch(this.state.searchURL)
            .then(response => {
                return response.json()
            })
            .then(json => this.setState({
                books: json
            }),
            error => console.log(error))
        });
        
    };

    render() {
        return (
            <div className ='blind-date'>
                <h1 className='bd-header'>Blind Date with a Bestseller</h1>
                <div className="display-categories">
                    <select value={this.state.listType} className="bd-dropdown"
                            onChange={(e) => this.setState({listType: e.target.value})}>
                            {this.state.listOptions.map(option => (
                                <option
                                    key={option.value}
                                    value={option.value}>{option.display}
                                </option>
                            ))}
                    </select>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type='submit'
                            value='Reveal Options'
                            className='bd-button'
                        />
                    </form>
                </div>
                {(this.state.books)
                    && <BookOptions books={this.state.books} handleSearch={(title) => this.props.handleSearch(title)} toBlindDate={() => this.props.toBlindDate()}/>}
            </div>
        )
    }
}
