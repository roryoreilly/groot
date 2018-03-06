const React = require('react');

export default class User extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>
				<td>{this.props.firstName}</td>
				<td>{this.props.balance}</td>
				<td>{this.props.account}</td>
			</tr>
		)
	}
}
