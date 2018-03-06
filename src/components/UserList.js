import User from './User.js';

const React = require('react');

export default class UserList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		fetch(
			'http://localhost:8080/api/users'
		).then(results => {
			return results.json();
		}).then(data => {
			this.setState({users: data._embedded.users
				.map((user) =>
					<User key={user.account}
							firstName={user.firstName}
							balance={user.balance}
							account={user.account} />)
			});
		})
	}

	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr>
							<th>First Name</th>
							<th>Balance</th>
							<th>Account</th>
						</tr>
						{this.state.users}
					</tbody>
				</table>
			</div>
		)
	}
}
